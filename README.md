# Dost – A Blog Platform for Developers & Creators

Dost is a full-stack **Next.js** and **TypeScript** blogging platform that blends structured technical tutorials with short creative insights. It supports both Markdown-based long-form content and micro-idea posts.

---

## 📌 Project Description

The platform is designed for developers, designers, and creators to:

- Share detailed tutorials or quick 200-word thoughts  
- Discover content via tags and search  
- React, bookmark, and comment on posts  
- Switch between public and private post visibility  
- Enable superadmins to manage users and monitor platform activity

---

## ✅ Completed Features (as of now)

- 🔐 **Authentication** with roles: `user` and `superadmin`
- 🧑‍💻 **User Dashboard**: Edit profile with avatar upload
- 📊 **Superadmin Dashboard**: View total users, comments, tags + CRUD on users
- 📝 **Post Creation**: Markdown editor for long-form posts
- 🔍 **Explore Page (`/posts`)**: Search and view all public posts
- 📄 **Individual Post Page**: Markdown rendering with author and tags
- 📚 **FAQ Page**: Displays FAQs; superadmin can manage FAQs (CRUD)

---

## 🧠 Tech Stack

- **Next.js (App Router)**  
- **TypeScript**  
- **MongoDB with Mongoose**  
- **Tailwind CSS**  
- **JWT Auth**  
- **React Markdown + Highlighting**

---

## 🚧 Upcoming Features

- Micro-post creation (200-word limit)  
- Emoji reactions  
- Bookmarks (private/public collection)  
- Threaded comments with code highlighting  
- Post export functionality  

---

## 🛠 Setup

```bash
git clone <repo-url>
cd dost
npm install
npm run dev
