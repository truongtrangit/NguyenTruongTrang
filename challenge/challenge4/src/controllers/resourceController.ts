import { Request, Response } from "express";
import Resource from "../models/resource";
import {
  createResourceValidation,
  updateResourceValidation,
} from "../validations/resourceValidation";

export const createResource = async (req: Request, res: Response) => {
  try {
    const { error } = createResourceValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingResource = await Resource.exists({ slug: req.body.slug });
    if (existingResource) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    const resource = await Resource.create(req.body);
    return res.status(201).json(resource);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const listResources = async (req: Request, res: Response) => {
  try {
    const filters: any = {};
    let { query, priority, isActive, page = 0, limit = 10 } = req.query;

    if (query) {
      const regex = new RegExp(query.toString(), "g");
      filters["$or"] = [
        {
          name: { $regex: regex },
        },
        {
          slug: { $regex: regex },
        },
      ];
    }

    if (priority) {
      filters.priority = priority;
    }

    if (isActive) {
      filters.isActive = isActive;
    }

    page = parseInt(page.toString());

    if (page < 0) {
      return res.status(400).json({ error: "Invalid page value" });
    }

    limit = parseInt(limit.toString());

    if (limit < 0) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    const resources = await Resource.find(filters)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .lean();

    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id).lean();
    if (resource) {
      return res.status(200).json(resource);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { error } = updateResourceValidation.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (resource) {
      return res.json(resource);
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (resource) {
      return res.status(200).end();
    } else {
      return res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
