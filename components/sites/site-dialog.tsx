'use client';

import { useState, useEffect } from 'react';
import { supabase, type Site, type Project } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface SiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  site?: (Site & { project_name?: string }) | null;
  projects: Project[];
  onSuccess: () => void;
}

export function SiteDialog({
  open,
  onOpenChange,
  site,
  projects,
  onSuccess,
}: SiteDialogProps) {
  const [siteName, setSiteName] = useState('');
  const [address, setAddress] = useState('');
  const [projectId, setProjectId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (site) {
      setSiteName(site.site_name);
      setAddress(site.address);
      setProjectId(site.project_id);
    } else {
      setSiteName('');
      setAddress('');
      setProjectId('');
    }
  }, [site, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!siteName || !address || !projectId) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    try {
      if (site) {
        const { error } = await supabase
          .from('sites')
          .update({
            site_name: siteName,
            address,
            project_id: projectId,
          })
          .eq('id', site.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Site updated successfully',
        });
      } else {
        const { error } = await supabase.from('sites').insert({
          site_name: siteName,
          address,
          project_id: projectId,
        });

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Site created successfully',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving site:', error);
      toast({
        title: 'Error',
        description: 'Failed to save site',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{site ? 'Edit Site' : 'Add Site'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input
              id="site-name"
              placeholder="e.g., Main Construction Site"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="e.g., 123 Main St, City, State"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger id="project">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : site ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
