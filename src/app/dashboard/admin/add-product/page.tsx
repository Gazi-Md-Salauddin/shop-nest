"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpToLine } from 'lucide-react';
import { toast } from 'react-hot-toast';


// Define for form state TypeScript Interface
interface FormState {
  name: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  image: string;
  description: string;
}


interface ProductPayload {
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  inStock: boolean;
}

export default function AddProductPage() {


  interface Errors {
  image?: string;
}

const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormState>({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: ""
  });

  // Set event handler for input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // Form Submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const productData: ProductPayload = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image,
      description: formData.description,
      inStock: Number(formData.stock) > 0
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      // API response type handle
      const result = await response.json();

      if (result.success) {
        toast.success("Product added successfully");
        setFormData({
          name: "",
          brand: "",
          category: "",
          price: "",
          stock: "",
          image: "",
          description: ""
        });
      } else {
        toast.error(`Failed to add product: ${result.message}`);
      }
    } catch (error) {
      console.error("Frontend Submit Error:", error);
      toast.error((error as any).message || "Something went wrong!");
    }
  };


  const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);



  const handleImageUpload = async (
  e: ChangeEvent<HTMLInputElement>
): Promise<void> => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, image: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your real IMGBB API key environmental variable injection
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
    setImageUrl(data.data.url);

    setFormData((prev) => ({
        ...prev,
        image: data.data.url,
    }));

    setErrors((prev) => ({
        ...prev,
        image: undefined,
    }));
} else {
                setErrors(prev => ({ ...prev, image: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, image: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Product</h1>
        <p className="mt-2 text-muted-foreground">
          Fill in the information below to add a new product.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Wireless Headphone"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Samsung"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Electronics"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="99.99"
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                className="mt-2"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
  <span className="text-sm font-medium">Product Image</span>

  <div className="flex items-center gap-4 mt-2">
    <Label className="w-16 h-16 border border-dashed rounded-xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-primary">
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleImageUpload}
        className="hidden"
      />

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <p><ArrowUpToLine/></p>
      )}
    </Label>

    <div>
      <p className="text-sm">
        {isUploading ? "Uploading..." : "Upload Image"}
      </p>

      <p className="text-xs text-muted-foreground">
        PNG, JPG (Max 5MB)
      </p>


      {errors.image && (
        <p className="text-xs text-red-500 mt-1">
          {errors.image}
        </p>
      )}
      
    </div>
  </div>
</div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write product description..."
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
}
