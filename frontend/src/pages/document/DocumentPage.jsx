import React, { useState, useMemo, useEffect } from "react";
import DocumentHero from "../../components/document/DocumentHero";
import DocumentFilters from "../../components/document/DocumentFilters";
import DocumentList from "../../components/document/DocumentList";
import { documents } from "../../data/documents";

export default function DocumentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("Tất cả");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("12"); // "Khối 12" hoạt động mặc định giống ảnh thiết kế
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedType, selectedGrade]);

  // Bộ lọc tài liệu động dựa trên states
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Lọc theo Khối lớp
      if (selectedGrade && doc.grade !== selectedGrade) {
        return false;
      }

      // 2. Lọc theo Năm học
      if (selectedYear !== "Tất cả" && doc.academicYear !== selectedYear) {
        return false;
      }

      // 3. Lọc theo Loại tài liệu
      if (selectedType && doc.docType !== selectedType) {
        return false;
      }

      // 4. Lọc theo Tìm kiếm từ khóa (tiêu đề hoặc thẻ loại)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(query);
        const matchesTag = doc.tag.toLowerCase().includes(query);
        const matchesType = doc.type.toLowerCase().includes(query);
        return matchesTitle || matchesTag || matchesType;
      }

      return true;
    });
  }, [searchQuery, selectedYear, selectedType, selectedGrade]);

  return (
    <>
      {/* Import Material Icons dynamically to ensure all DocumentCard icons render correctly */}
      <style>{`
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 min-h-screen">
        {/* Hero Section */}
        <DocumentHero />

        {/* Filters Section */}
        <DocumentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
        />

        {/* Document Cards List & Pagination */}
        <DocumentList
          filteredDocs={filteredDocs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}
