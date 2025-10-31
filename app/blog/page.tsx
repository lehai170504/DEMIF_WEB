"use client"

import { useState, useMemo } from "react"
import { HeaderUser } from "@/components/layouts/User/HeaderUser"
import { FooterLanding } from "@/components/layouts/Landing/FooterLanding"
import { blogPosts, blogCategories, featuredPosts, popularPosts } from "@/lib/data/blog"

// Blog components
import { BlogHero } from "@/components/blog/BlogHero"
import { FeaturedPosts } from "@/components/blog/FeaturedPosts"
import { CategoryFilter } from "@/components/blog/CategoryFilter"
import { ResultsInfo } from "@/components/blog/ResultsInfo"
import { BlogPostCard } from "@/components/blog/BlogPostCard"
import { BlogPagination } from "@/components/blog/BlogPagination"
import { EmptyState } from "@/components/blog/EmptyState"
import { PopularPosts } from "@/components/blog/PopularPosts"
import { TagsCloud } from "@/components/blog/TagsCloud"
import { NewsletterCard } from "@/components/blog/NewsletterCard"

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  // Handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleReset = () => {
    handleSearchChange("")
    handleCategoryChange("all")
  }

  return (
    <>
      <HeaderUser />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <BlogHero searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <div className="container mx-auto px-4 py-12">
          {/* Featured Posts */}
          {selectedCategory === "all" && searchQuery === "" && (
            <FeaturedPosts posts={featuredPosts} />
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Category Filter */}
              <CategoryFilter
                categories={blogCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* Results Info */}
              <ResultsInfo
                totalResults={filteredPosts.length}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />

              {/* Blog Posts Grid */}
              {filteredPosts.length === 0 ? (
                <EmptyState onReset={handleReset} />
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalPosts={filteredPosts.length}
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-96 space-y-6">
              <PopularPosts posts={popularPosts} />
              <TagsCloud onTagClick={handleSearchChange} />
              <NewsletterCard />
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </>
  )
}