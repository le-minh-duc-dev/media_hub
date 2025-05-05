# 🌸 **Media Hub**

## 🌐 **Overview**

**Media Hub** is a feature-rich web application built with **Next.js 15**, designed to provide an engaging experience for various user roles—**guests, members, and admins**. It delivers personalized content such as posts, profiles, and topics, alongside automated daily updates and real-time notifications.

Key features include:

- **Admin-managed content** (posts, girls, topics)
- **Automated daily post generation**
- **User preferences & personalization**
- **Real-time browser notifications**
- **Searchable & categorized content**
- **Modern, responsive UI/UX**
- **Cache optimization with Next.js unstable cache and service worker caching for media**

---

## 🏗️ **Architecture & Technologies**

| Layer                        | Tools & Frameworks                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **Frontend**                 | Next.js 15, Tailwind CSS, HeroUI, Tiptap Editor, React Hook Form, React Photo View |
| **Authentication**           | Auth.js (GitHub & Google OAuth)                                                    |
| **Backend / API**            | Next.js server actions, MongoDB, Mongoose ODM                                      |
| **Validation**               | Zod                                                                                |
| **Search**                   | MongoDB Text Indexes                                                               |
| **Media**                    | Cloudinary                                                                         |
| **Realtime / Notifications** | Browser Push Notifications (Subscription model)                                    |
| **Utilities**                | Cron jobs, Retry & Rollback for safe operations                                    |
| **Caching**                  | **Next.js Unstable Cache** for dynamic data caching and **Service Worker Cache** for media files (images/videos) |
---

## 🧩 **Key Features**

### ✅ **Authentication & Access Control**

- **OAuth Authentication** via **GitHub** & **Google** using `Auth.js`
- **Role-based Content Visibility**:

  - **Guests**: View public posts
  - **Members**: Access private posts and richer content
  - **Admins**: Manage all content (CRUD for posts, girls, topics)

### 📸 **Media Storage & User Preferences**

- **Cloudinary** integration for media storage, configurable per user
- Support for **multi-account** Cloudinary deployments (via the `Configuration` model)
- **Storage validation** using a `CloudStorage` enum

### 📆 **Daily Content Automation**

- **Automated Daily Posts** using the `DailyPost` model
- **Cron Jobs** to schedule content updates
- **Private** & **Public** post slots for curated homepage content

### 👧 **Girl Profiles & Topic Taxonomy**

- Profiles include public/private info, descriptions, and related `Topic` associations
- **Topic Model**: Categorizes girls by career (e.g., model, actress) or platform (e.g., Instagram, TikTok)
- Full-text search support on name/description fields

### 📝 **Post Management**

- Posts consist of:

  - **User** (creator)
  - **Girl** (linked entity)
  - Title, description, and body content (e.g., images/videos)
  - SEO-friendly URLs, indexed fields for fast search (e.g., `param`, `title`)

- Post metadata includes **view count**, **privacy settings**, and rollback-safe updates

### 🔔 **Browser Push Notifications**

- **Subscription model** for push notification credentials
- Real-time notifications for new posts or updates, tailored for each user
- Personalized notification experiences based on user preferences

### 🔍 **Search, Indexing, and Performance**

- **MongoDB full-text indexes** on searchable fields like `Post`, `Girl`, and `Topic`
- Fast lookups via indexed fields like `param` and unique keys

### 🔧 **Developer Experience Features**

- Retry-safe operations with rollback mechanisms
- **Server Actions** (Next.js 15) for co-located backend logic
- Graceful failure handling on create/update operations
- Light/dark theme support and responsive design using **TailwindCSS**
- **Unstable Cache** feature in Next.js for improved dynamic data caching and faster loading of personalized content
---

## 📂 **MongoDB Schema Models**

### 1. **User Model**

- **name**: `String` - User's name
- **email**: `String` (required, unique) - User's email address
- **password**: `String` - Hashed password
- **role**: `String` (required) - User's role (`User`, `Admin`, `SuperAdmin`)
- **createdAt**: `Date` - User creation timestamp
- **updatedAt**: `Date` - Last update timestamp

### 2. **Configuration Model**

- **user**: `ObjectId` (required, unique) - Link to the `User` model
- **cloudStorage**: `String` - Cloud storage used (e.g., Cloudinary)
- **createdAt**: `Date` - Configuration creation timestamp
- **updatedAt**: `Date` - Last update timestamp

### 3. **DailyPost Model**

- **date**: `String` (required) - Date of the post
- **privatePost**: `ObjectId` (required) - Reference to the `Post` model (private)
- **publicPost**: `ObjectId` (required) - Reference to the `Post` model (public)
- **createdAt**: `Date` - Timestamp of creation
- **updatedAt**: `Date` - Timestamp of last update

### 4. **Girl Model**

- **user**: `ObjectId` (required) - Reference to the `User` model
- **name**: `String` - Name of the girl
- **param**: `String` (unique, indexed) - Unique identifier for the girl
- **description**: `String` - Description of the girl
- **url**: `String` - URL related to the girl (e.g., social media)
- **topic**: `ObjectId` (required) - Link to the `Topic` model
- **isPrivate**: `Boolean` (default: false) - Privacy setting
- **createdAt**: `Date` - Timestamp of creation
- **updatedAt**: `Date` - Timestamp of last update

### 5. **Post Model**

- **user**: `ObjectId` (required) - Reference to the `User` model
- **title**: `String` - Title of the post
- **description**: `String` - Post description
- **param**: `String` (unique, indexed) - Unique identifier for the post
- **girl**: `ObjectId` (required) - Link to the `Girl` model
- **body**: `[Object]` - Array of content items (e.g., images, videos)
- **isPrivate**: `Boolean` (default: false) - Privacy setting
- **view**: `Number` (default: 0) - View count
- **createdAt**: `Date` - Timestamp of creation
- **updatedAt**: `Date` - Timestamp of last update

### 6. **Topic Model**

- **user**: `ObjectId` (required) - Link to the `User` model
- **name**: `String` (unique) - Name of the topic
- **param**: `String` (unique, indexed) - Unique identifier for the topic
- **description**: `String` - Description of the topic
- **isPrivate**: `Boolean` (default: false) - Privacy setting
- **createdAt**: `Date` - Timestamp of creation
- **updatedAt**: `Date` - Timestamp of last update

### 7. **Subscription Model**

- **endpoint**: `String` (required, unique) - Endpoint URL for push notifications
- **keys**:

  - **p256dh**: `String` (required) - Encryption key
  - **auth**: `String` (required) - Authentication key

---

## 📑 **UI/UX Design**

- **HeroUI** for modern, intuitive interfaces (admin/member panels)
- **Tiptap** editor for markdown-rich post creation
- **React Hook Form** & **Zod** for seamless form handling and validation
- **React Photo View** for media zoom and interaction
- Clean **breadcrumb navigation**, dark/light themes, and responsive design via **TailwindCSS**

---

## 🔗 **Core Routes**

| Path                         | Purpose                           |
| ---------------------------- | --------------------------------- |
| `/`                          | Homepage with curated daily posts |
| `/posts`                     | All public/member posts           |
| `/posts/[param]`             | View detailed post                |
| `/topics/`                   | List all topics                   |
| `/topics/[param]`            | Posts by topic                    |
| `/girls/[param]`             | Girl profile and associated posts |
| `/admin/girls/create`        | Admin panel: create girl          |
| `/admin/girls/edit/[param]`  | Admin panel: edit girl            |
| `/admin/posts/create`        | Admin panel: create post          |
| `/admin/posts/edit/[param]`  | Admin panel: edit post            |
| `/admin/topic/create`        | Admin panel: create topic         |
| `/admin/topics/edit/[param]` | Admin panel: edit topic           |
