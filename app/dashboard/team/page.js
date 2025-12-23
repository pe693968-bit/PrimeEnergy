'use client'

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { Users, Trash2, Loader2, Package, BarChart3, FolderKanban, BadgePercent } from "lucide-react";
import LogoutButton from "@/app/components/logout";

import Link from "next/link";

export default function TeamDashboard() {
  const pathname = usePathname();

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    description: "",
  });

  const [image, setImage] = useState(null); // will store uploaded image URL
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle | uploading | done | error

  // Fetch team members
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error("Failed to fetch team");
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load team members");
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Auto-upload image on select
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus("uploading");

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "education_images"); // change your preset

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dcqyrgeii/image/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Upload failed");
      setImage(data.secure_url);
      setUploadStatus("done");
      toast.success("Image uploaded ✅");
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
      toast.error("Image upload failed ❌");
    }
  };

  const handleSaveMember = async () => {
    if (!formData.name || !formData.profession) {
      toast.error("Name and Profession are required");
      return;
    }

    setSaving(true);

    try {
      const payload = { ...formData, image }; // image is already uploaded URL

      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add member");
      const newMember = await res.json();

      setTeam([...team, newMember]);
      toast.success("Team member added ✅");

      setFormData({ name: "", profession: "", description: "" });
      setImage(null);
      setUploadStatus("idle");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add team member ❌");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch("/api/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete member");
      setTeam(team.filter((m) => m.id !== id));
      toast.success("Team member deleted ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete member ❌");
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
          <h1 className="text-3xl font-semibold">Team Members</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#f2801c]">Add Member</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4">
                <Input name="name" placeholder="Full Name" onChange={handleChange} value={formData.name} />
                <Input name="profession" placeholder="Profession" onChange={handleChange} value={formData.profession} />
                <Textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description} />
                
                {/* Image Upload */}
                <div>
                  <label className="block mb-1 text-gray-700">Upload Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    disabled={uploadStatus === "uploading" || saving}
                  />
                  {uploadStatus === "uploading" && <p className="text-blue-500 text-xs mt-1">Uploading...</p>}
                  {uploadStatus === "done" && <p className="text-green-500 text-xs mt-1">Uploaded ✅</p>}
                  {uploadStatus === "error" && <p className="text-red-500 text-xs mt-1">Upload failed ❌</p>}
                </div>
              </div>

              <Button
                onClick={handleSaveMember}
                disabled={saving || uploadStatus === "uploading"}
                className="mt-6 bg-[#f2801c] w-full flex gap-2"
              >
                {(saving || uploadStatus === "uploading") && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving ? "Saving..." : uploadStatus === "uploading" ? "Uploading Image..." : "Save Member"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 mt-4">Loading team members...</p>
        ) : team.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">No team members added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white shadow hover:shadow-lg transition flex flex-col p-5 rounded-lg border border-gray-100">
                {member.image && <img src={member.image} alt={member.name} className="w-full h-44 object-cover rounded-lg mb-3" />}
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-[#f2801c] font-medium">{member.profession}</p>
                <p className="text-gray-600 mt-2 line-clamp-3">{member.description}</p>
                <Button onClick={() => handleDeleteMember(member.id)} size="sm" className="mt-4 bg-[#f2801c] text-white flex items-center gap-1 hover:opacity-90">
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
