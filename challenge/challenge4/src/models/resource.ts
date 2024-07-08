import { Schema, model } from "mongoose";

interface IResource {
  slug: string;
  name: string;
  description?: string;
  tags: string[];
  priority: "low" | "medium" | "high";
  isActive: boolean;
}

const resourceSchema = new Schema<IResource>(
  {
    slug: { type: String, unique: true, match: /^[a-z_][a-z0-9_]*$/ },
    name: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], default: [] },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

resourceSchema.index({ slug: -1 });
resourceSchema.index({ isActive: -1 });
resourceSchema.index({ priority: -1 });

const Resource = model<IResource>("Resource", resourceSchema);

export default Resource;
