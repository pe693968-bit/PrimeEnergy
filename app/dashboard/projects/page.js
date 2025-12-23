"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {   Users } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { Package, BarChart3 } from "lucide-react";
import { Loader2, FolderKanban, Activity, MapPin, Youtube, Zap, Trash2, BadgePercent } from "lucide-react";
import LogoutButton from "@/app/components/logout";

export default function ProjectsDashboard() {
  const pathname = usePathname();
  const [projects, setProjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [uploadStatus, setUploadStatus] = useState({ cover: "idle", img2: "idle", img3: "idle" });
  const [images, setImages] = useState({ cover: null, img2: null, img3: null });
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    capacity: "",
    location: "",
    status: "",
    youtubeLink: "",
    shortDescription: "",
  });

  const isUploading = uploadStatus.cover === "uploading" || uploadStatus.img2 === "uploading" || uploadStatus.img3 === "uploading";

  // ------------------------- fetch projects on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load projects, showing empty list");
      }
    }
    fetchProjects();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const uploadImageToCloudinary = async (file) => {
    if (!file) return "";
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "education_images");
    const res = await fetch("https://api.cloudinary.com/v1_1/dcqyrgeii/image/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error("Upload failed");
    return data.secure_url;
  };

  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus((p) => ({ ...p, [key]: "uploading" }));
    setImages((p) => ({ ...p, [key]: file }));
    try {
      await uploadImageToCloudinary(file);
      setUploadStatus((p) => ({ ...p, [key]: "done" }));
    } catch {
      setUploadStatus((p) => ({ ...p, [key]: "error" }));
    }
  };

  const handleSaveProject = async () => {
    if (isUploading) {
      toast.info("Please wait, images are still uploading...");
      return;
    }
    try {
      setSaving(true);
      const coverUrl = await uploadImageToCloudinary(images.cover);
      const img2Url = await uploadImageToCloudinary(images.img2);
      const img3Url = await uploadImageToCloudinary(images.img3);

      const payload = { ...formData, images: [coverUrl, img2Url, img3Url] };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setProjects((p) => [...p, saved]);

      toast.success("Project added successfully ✅");

      // Reset form
      setFormData({ title: "", type: "", capacity: "", location: "", status: "", youtubeLink: "", shortDescription: "" });
      setImages({ cover: null, img2: null, img3: null });
      setUploadStatus({ cover: "idle", img2: "idle", img3: "idle" });
      setDialogOpen(false); // close dialog
    } catch {
      toast.error("Failed to save project ❌");
    } finally {
      setSaving(false);
    }
  };

  // ------------------------- DELETE PROJECT
  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((p) => p.filter((proj) => proj._id !== id));
      toast.success("Project deleted ✅");
    } catch (err) {
      toast.error("Failed to delete project ❌");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f2801c] text-white px-6 py-8 flex flex-col justify-between min-h-screen">
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" className="w-10 h-10 bg-white rounded-full p-1" />
                  <div>
                    <h1 className="font-semibold">Prime Energy</h1>
                    <span className="text-xs text-white/80">Admin Panel</span>
                  </div>
                </div>
      
                <nav className="flex flex-col gap-3 text-sm">
  <Link href="/dashboard">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <Package size={18} /> Products
    </Button>
  </Link>

  <Link href="/dashboard/stocks">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/stocks"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <BarChart3 size={18} /> Stocks
    </Button>
  </Link>

  <Link href="/dashboard/projects">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/projects"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <FolderKanban size={18} /> Projects
    </Button>
  </Link>

  <Link href="/dashboard/team">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/team"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <Users size={18} /> Team
    </Button>
  </Link>

  <Link href="/dashboard/pricing">
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        pathname === "/dashboard/pricing"
          ? "bg-white text-[#f2801c]"
          : "text-white hover:bg-white/20"
      }`}
    >
      <BadgePercent size={18} /> Pricing
    </Button>
  </Link>
</nav>

              </div>
      
              <LogoutButton />
            </aside>


      {/* Main */}
      <main className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Solar Projects</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#f2801c]">Add Project</Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add Solar Project</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                <Input name="title" placeholder="Project Title" onChange={handleChange} value={formData.title} />
                <Select onValueChange={(v) => setFormData({ ...formData, type: v })} value={formData.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>

                <Input name="capacity" placeholder="Capacity (kW)" onChange={handleChange} value={formData.capacity} />
                <Input name="location" placeholder="Location" onChange={handleChange} value={formData.location} />
                <Input name="status" placeholder="Status (Completed / Ongoing)" onChange={handleChange} value={formData.status} />
                <Input name="youtubeLink" placeholder="YouTube Video Link" onChange={handleChange} value={formData.youtubeLink} />
              </div>

              <Textarea className="mt-4" name="shortDescription" placeholder="Short Description" onChange={handleChange} value={formData.shortDescription} />

              <div className="grid grid-cols-3 gap-4 mt-6">
                {["cover", "img2", "img3"].map((key, i) => (
                  <div key={key}>
                    <Label>{key === "cover" ? "Thumbnail" : `Image ${i}`}</Label>
                    <Input type="file" onChange={(e) => handleImageChange(e, key)} />
                    {uploadStatus[key] === "uploading" && <p className="text-xs text-blue-500">Uploading...</p>}
                    {uploadStatus[key] === "done" && <p className="text-xs text-green-500">Uploaded ✅</p>}
                  </div>
                ))}
              </div>

              <Button onClick={handleSaveProject} disabled={saving || isUploading} className="mt-6 bg-[#f2801c] w-full flex gap-2">
                {(saving || isUploading) && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving Project..." : isUploading ? "Uploading Images..." : "Save Project"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {projects.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">No projects added yet</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="bg-white choose-border shadow hover:shadow-xl transition overflow-hidden flex flex-col">
                <div className="relative">
                  <img src={project.images?.[0] || "/placeholder.jpg"} alt={project.title} className="h-44 w-full object-cover" />
                  <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full text-white ${project.status?.toLowerCase().includes("complete") ? "bg-green-600" : "bg-yellow-500"}`}>{project.status}</span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-1 line-clamp-2">{project.title}</h3>
                  <p className="text-xs text-gray-500 capitalize">{project.type} Project</p>
                  <div className="mt-2 text-sm text-gray-600 flex flex-col gap-1">
                    <p className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> {project.capacity} kW</p>
                    <p className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-500" /> {project.location}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{project.shortDescription}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t">
                    {project.youtubeLink && (
                      <a href={project.youtubeLink} target="_blank" className="text-white bg-[#f2801c] px-2 py-1 rounded flex items-center gap-1 text-xs font-medium hover:opacity-90">
                        <Youtube className="w-3 h-3" /> Watch Video
                      </a>
                    )}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs bg-[#f2801c]/10 text-[#f2801c] px-2 py-1 rounded-full flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {project.capacity} kW
                      </span>
                      <Button onClick={() => handleDeleteProject(project._id)} size="sm" className="bg-[#f2801c] text-white flex items-center gap-1 hover:opacity-90">
                        <Trash2 className="w-3 h-3" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
