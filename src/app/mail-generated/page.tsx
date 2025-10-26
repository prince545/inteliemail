"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MailGenerated() {
  const [formData, setFormData] = useState({
    role: "",
    companyType: "",
    jobPosition: "",
    skills: "",
    projects: "",
    aboutYou: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const prompt = `Generate a professional cold email for a ${formData.role} position at a ${formData.companyType} company. 
      Job position: ${formData.jobPosition}. 
      My skills: ${formData.skills}. 
      My projects: ${formData.projects}. 
      About me: ${formData.aboutYou}. 
      Make it concise, professional, and engaging.`;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate email");

      const data = await response.json();
      setGeneratedEmail(data.text);
    } catch (error) {
      toast.error("Failed to generate email. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <h1 className="text-3xl font-bold mb-8">Generate Your Cold Email</h1>
      
      {!generatedEmail ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Role/Position</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Type</label>
            <input
              type="text"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Position</label>
            <input
              type="text"
              name="jobPosition"
              value={formData.jobPosition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Projects</label>
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">About You</label>
            <textarea
              name="aboutYou"
              value={formData.aboutYou}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Email"
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="whitespace-pre-line">{generatedEmail}</div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedEmail);
                toast.success("Email copied to clipboard!");
              }}
            >
              Copy to Clipboard
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setGeneratedEmail("");
                setFormData({
                  role: "",
                  companyType: "",
                  jobPosition: "",
                  skills: "",
                  projects: "",
                  aboutYou: "",
                });
              }}
            >
              Generate Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}