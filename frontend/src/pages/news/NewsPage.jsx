import { useState, useMemo } from "react";
import { newsArticles } from "../../data/news";
import { FeaturedBanner, NewsCard } from "../../components/news/NewsCard";
import NewsFilter from "../../components/news/NewsFilter";
import Pagination from "../../components/common/Pagination";

const ARTICLES_PER_PAGE = 6;

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Bài nổi bật ──────────────────────────────────────
  const featured = newsArticles.find((a) => a.featured);

  // ── Lọc & sắp xếp ────────────────────────────────────
  const filteredArticles = useMemo(() => {
    let list = newsArticles.filter((a) => !a.featured);

    if (activeCategory !== "Tất cả") {
      list = list.filter((a) => a.category === activeCategory);
    }

    if (sortOption === "popular") {
      list = [...list].sort(
        (a, b) => parseFloat(b.views) - parseFloat(a.views)
      );
    }

    return list;
  }, [activeCategory, sortOption]);

  // ── Phân trang ────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 min-h-screen bg-white space-y-8">
      {/* ── Banner bài nổi bật ── */}
      <FeaturedBanner article={featured} />

      {/* ── Bộ lọc danh mục + sắp xếp ── */}
      <NewsFilter
        activeCategory={activeCategory}
        onSelect={handleCategoryChange}
        sortOption={sortOption}
        onSortChange={(v) => { setSortOption(v); setCurrentPage(1); }}
      />

      {/* ── Grid bài viết ── */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {paginatedArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-3">
          <p className="text-4xl">📰</p>
          <p className="font-bold text-[#1A2B47]">Chưa có bài viết nào trong danh mục này</p>
          <p className="text-sm text-slate-400">Vui lòng chọn danh mục khác</p>
        </div>
      )}

      {/* ── Phân trang ── */}
      {filteredArticles.length > ARTICLES_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
