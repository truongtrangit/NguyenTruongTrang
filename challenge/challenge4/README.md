# Express TypeScript CRUD API

This is a basic CRUD API built with ExpressJS, TypeScript, and MongoDB.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp ./challenge/challenge4/.env.example ./challenge/challenge4/.env
```

3. Update the MongoDB URI:

Open the `.env` file in challenge/challenge4 folder and update the `MONGODB_URI` variable with the MongoDB URI provided via email:

```env
MONGODB_URI=<mongodb_uri_here>
```

4. Run server

```bash
npm run challenge4
```

-> At this time, server have been running at PORT which you defined at PORT variable in .env file.

## API Endpoints

- `POST /api/resources` - Create a new resource
- `GET /api/resources` - List all resources with basic filters (e.g., `?query=example&priority=high&isActive=true`)
- `GET /api/resources/:id` - Get a specific resource by ID
- `PUT /api/resources/:id` - Update a resource by ID
- `DELETE /api/resources/:id` - Delete a resource by ID

## Example Resource JSON

```json
{
  "slug": "sample_resource",
  "name": "Sample Resource",
  "description": "This is a sample resource.",
  "tags": ["example", "sample"],
  "priority": "high",
  "isActive": true
}
```
