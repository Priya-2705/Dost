# Dost – A Blog Platform for Developers & Creators

Dost is a full-stack **Next.js** and **TypeScript** blogging platform that blends structured technical tutorials with short creative insights. It supports both Markdown-based long-form content and micro-idea posts.

---

## 📌 Project Description

The platform is designed for developers, designers, and creators to:

- Share detailed tutorials or quick 200-word micro-posts  
- Discover content via tags, full-text search, and filters  
- React to, bookmark, and comment on posts (with code support)  
- Toggle post visibility (public/private)  
- Export posts for offline use  
- Superadmins can manage users, tags, FAQs, and contact messages

---

## ✅ Completed Features

- 🔐 **Authentication** with role-based access (`user`, `superadmin`)
- 🧑‍💻 **User Dashboard** with avatar upload and profile editing
- 📊 **Superadmin Dashboard** with:
  - Total users, comments, tags
  - Full CRUD for users
  - Manage contact messages and FAQ section
- 📝 **Post Creation** with Markdown editor, code blocks, and image upload
- 💡 **Micro-Idea Posts**: 200-word mini posts for quick insights
- 🔍 **Explore Page (`/`)**: Search and view public + followed users' posts
- 📄 **Individual Post Page** with Markdown rendering and threaded comments
- 🧵 **Comments and Replies** with code support and smart hashtags
- 🔖 **Bookmarks**: Save posts to private/public collections
- 🎉 **Emoji Reactions**: (👏 💡 🤯) per-user reaction system
- 📁 **Post Exporting** (copy/save content)
- 🏷️ **Tags Page** with follow/hide features
- 👥 **Team/About Page** with dynamic team member cards for superadmin control

---

## 🧠 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS  
- **Backend**: Node.js, TypeScript, MongoDB with Mongoose  
- **Auth**: Custom JWT-based authentication  
- **Editor**: Markdown (React Markdown, MDX, syntax highlighting)

---

## 🛠 Setup Instructions

1. npm install
2. npm run dev 

##👥 Team Contributions
- Name	Responsibilities
- Priya	Markdown/MDX Editor, Threaded Comments with Code + Hashtags
- Harshini	Micro-Idea Posts, Tagging by Domain/Stack/Theme
- Sai	Full-text Search, Public/Private Post Toggle
- Sadhana	Bookmarks, Emoji Reactions
