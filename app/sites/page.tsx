'use client';

import { useEffect, useState } from 'react';
import { supabase, type Site, type Project } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { SiteDialog } from '@/components/sites/site-dialog';
import { DeleteDialog } from '@/components/sites/delete-dialog';

export default function SitesPage() {
  const [sites, setSites] = useState<(Site & { project_name?: string })[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<(Site & { project_name?: string }) | null>(null);
  const [siteToDelete, setSiteToDelete] = useState<(Site & { project_name?: string }) | null>(null);

  const fetchSites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sites:', error);
    } else {
      const sitesWithProjects = (data || []).map((site) => {
        const project = projects.find((p) => p.id === site.project_id);
        return {
          ...site,
          project_name: project?.name || 'Unknown Project',
        };
      });
      setSites(sitesWithProjects);
    }
    setLoading(false);
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      fetchSites();
    }
  }, [projects]);

  const handleAddSite = () => {
    setSelectedSite(null);
    setDialogOpen(true);
  };

  const handleEditSite = (site: Site & { project_name?: string }) => {
    setSelectedSite(site);
    setDialogOpen(true);
  };

  const handleDeleteClick = (site: Site & { project_name?: string }) => {
    setSiteToDelete(site);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!siteToDelete) return;

    const { error } = await supabase
      .from('sites')
      .delete()
      .eq('id', siteToDelete.id);

    if (error) {
      console.error('Error deleting site:', error);
    } else {
      await fetchSites();
      setDeleteDialogOpen(false);
      setSiteToDelete(null);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sites</h1>
          <p className="text-muted-foreground mt-1">
            Manage construction sites across projects
          </p>
        </div>
        {projects.length > 0 && (
          <Button onClick={handleAddSite}>
            <Plus className="mr-2 h-4 w-4" />
            Add Site
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading sites...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">
            Create a project first to add sites
          </p>
          <Button asChild>
            <a href="/projects">View Projects</a>
          </Button>
        </div>
      ) : sites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">No sites yet</p>
          <Button onClick={handleAddSite}>
            <Plus className="mr-2 h-4 w-4" />
            Create your first site
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{site.site_name}</TableCell>
                  <TableCell>{site.address}</TableCell>
                  <TableCell>{site.project_name}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditSite(site)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(site)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <SiteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        site={selectedSite}
        projects={projects}
        onSuccess={fetchSites}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        siteName={siteToDelete?.site_name || ''}
      />
    </div>
  );
}
