// Mock data for blog posts

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

// Blog categories
export const blogCategories: BlogCategory[] = [
  {
    id: "all",
    name: "Tất cả",
    slug: "all",
    count: 12,
  },
  {
    id: "tips",
    name: "Mẹo học tập",
    slug: "Mẹo học tập",
    count: 4,
  },
  {
    id: "grammar",
    name: "Ngữ pháp",
    slug: "Ngữ pháp",
    count: 3,
  },
  {
    id: "pronunciation",
    name: "Phát âm",
    slug: "Phát âm",
    count: 2,
  },
  {
    id: "vocabulary",
    name: "Từ vựng",
    slug: "Từ vựng",
    count: 3,
  },
];

// Mock blog posts
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Mẹo Học Tiếng Anh Hiệu Quả Cho Người Mới Bắt Đầu",
    excerpt:
      "Khám phá những phương pháp đơn giản nhưng hiệu quả giúp bạn cải thiện kỹ năng tiếng Anh mỗi ngày.",
    content: `
      <p>Học tiếng Anh không phải là một hành trình dễ dàng, nhưng với những mẹo phù hợp, bạn có thể tiến bộ nhanh chóng và bền vững.</p>
      
      <h2>1. Luyện tập mỗi ngày</h2>
      <p>Tính nhất quán là chìa khóa thành công. Chỉ cần 15-30 phút mỗi ngày với DEMIF có thể tạo ra sự khác biệt lớn.</p>
      
      <h2>2. Nghe nhiều hơn nói</h2>
      <p>Trước khi nói tốt, bạn cần nghe nhiều. Hãy nghe podcast, xem phim tiếng Anh có phụ đề.</p>
      
      <h2>3. Đừng sợ mắc lỗi</h2>
      <p>Mỗi lỗi sai là một bài học. Hãy dũng cảm thực hành và học từ sai lầm.</p>
    `,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/avatars/author-1.jpg",
      role: "Giảng viên tiếng Anh",
      bio: "10 năm kinh nghiệm giảng dạy tiếng Anh, chuyên về phương pháp học hiện đại và công nghệ giáo dục.",
    },
    category: "Mẹo học tập",
    tags: ["học tiếng anh", "mẹo học tập", "người mới bắt đầu"],
    coverImage: "/blog/tips-beginners.jpg",
    publishedAt: "2024-10-25",
    readTime: 5,
    views: 1248,
    likes: 89,
  },
  {
    id: "2",
    title: "Shadowing - Phương Pháp Luyện Phát Âm Hiệu Quả Nhất",
    excerpt:
      "Tìm hiểu về kỹ thuật shadowing và cách áp dụng nó để cải thiện phát âm và khả năng nghe của bạn.",
    content: `
      <p>Shadowing là một trong những phương pháp hiệu quả nhất để cải thiện phát âm và khả năng nghe hiểu tiếng Anh.</p>
      
      <h2>Shadowing là gì?</h2>
      <p>Shadowing là kỹ thuật lặp lại ngay lập tức những gì bạn nghe, giống như một cái bóng theo sau người nói.</p>
      
      <h2>Lợi ích của Shadowing</h2>
      <ul>
        <li>Cải thiện phát âm tự nhiên</li>
        <li>Tăng tốc độ phản xạ ngôn ngữ</li>
        <li>Học được nhịp điệu và ngữ điệu</li>
      </ul>
    `,
    author: {
      name: "Trần Thị B",
      avatar: "/avatars/author-2.jpg",
      role: "Chuyên gia phát âm",
      bio: "Chuyên gia phát âm với 8 năm kinh nghiệm, tốt nghiệp thạc sĩ ngôn ngữ học tại Úc.",
    },
    category: "Phát âm",
    tags: ["shadowing", "phát âm", "luyện nghe"],
    coverImage: "/blog/shadowing-method.jpg",
    publishedAt: "2024-10-23",
    readTime: 7,
    views: 2156,
    likes: 145,
  },
  {
    id: "3",
    title: "5 Sai Lầm Phổ Biến Khi Học Ngữ Pháp Tiếng Anh",
    excerpt:
      "Tránh những sai lầm thường gặp này để tiết kiệm thời gian và học ngữ pháp hiệu quả hơn.",
    content: `
      <p>Nhiều người học tiếng Anh gặp khó khăn với ngữ pháp do những sai lầm cơ bản có thể tránh được.</p>
      
      <h2>1. Học quá nhiều quy tắc cùng lúc</h2>
      <p>Hãy tập trung vào một chủ đề ngữ pháp mỗi lần và thực hành thật kỹ trước khi chuyển sang chủ đề mới.</p>
      
      <h2>2. Chỉ học lý thuyết không thực hành</h2>
      <p>Ngữ pháp cần được áp dụng trong ngữ cảnh thực tế, không chỉ học thuộc lòng.</p>
    `,
    author: {
      name: "Lê Văn C",
      avatar: "/avatars/author-3.jpg",
      role: "Giáo viên ngữ pháp",
      bio: "Giáo viên ngữ pháp với 12 năm kinh nghiệm, chuyên giúp học viên hiểu và áp dụng ngữ pháp dễ dàng.",
    },
    category: "Ngữ pháp",
    tags: ["ngữ pháp", "sai lầm", "học tiếng anh"],
    coverImage: "/blog/grammar-mistakes.jpg",
    publishedAt: "2024-10-20",
    readTime: 6,
    views: 1876,
    likes: 112,
  },
  {
    id: "4",
    title: "Cách Học Từ Vựng Thông Minh Với Phương Pháp Spaced Repetition",
    excerpt:
      "Khám phá bí quyết ghi nhớ từ vựng lâu dài với hệ thống lặp lại ngắt quãng.",
    content: `
      <p>Spaced Repetition là phương pháp khoa học giúp bạn ghi nhớ từ vựng hiệu quả và lâu dài.</p>
      
      <h2>Nguyên lý hoạt động</h2>
      <p>Hệ thống sẽ nhắc bạn ôn tập từ vựng đúng lúc trước khi bạn quên, tối ưu hóa quá trình ghi nhớ.</p>
      
      <h2>Cách áp dụng</h2>
      <p>DEMIF tích hợp sẵn hệ thống spaced repetition, tự động nhắc nhở bạn ôn tập từ vựng.</p>
    `,
    author: {
      name: "Phạm Thị D",
      avatar: "/avatars/author-4.jpg",
      role: "Chuyên gia từ vựng",
      bio: "Chuyên gia từ vựng và tâm lý học nhận thức, nghiên cứu về phương pháp ghi nhớ hiệu quả.",
    },
    category: "Từ vựng",
    tags: ["từ vựng", "spaced repetition", "ghi nhớ"],
    coverImage: "/blog/vocabulary-spaced.jpg",
    publishedAt: "2024-10-18",
    readTime: 8,
    views: 1654,
    likes: 98,
  },
  {
    id: "5",
    title: "AI Trong Học Tiếng Anh: Tương Lai Đã Đến",
    excerpt:
      "Tìm hiểu cách trí tuệ nhân tạo đang thay đổi cách chúng ta học ngôn ngữ.",
    content: `
      <p>Công nghệ AI đang cách mạng hóa cách học tiếng Anh, mang đến trải nghiệm học tập cá nhân hóa và hiệu quả chưa từng có.</p>
      
      <h2>AI phân tích phát âm</h2>
      <p>Hệ thống AI có thể phân tích phát âm của bạn với độ chính xác cao, chỉ ra từng âm cần cải thiện.</p>
      
      <h2>Học tập cá nhân hóa</h2>
      <p>AI điều chỉnh nội dung học tập phù hợp với trình độ và mục tiêu của từng người học.</p>
    `,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/avatars/author-1.jpg",
      role: "Giảng viên tiếng Anh",
      bio: "10 năm kinh nghiệm giảng dạy tiếng Anh, chuyên về phương pháp học hiện đại và công nghệ giáo dục.",
    },
    category: "Mẹo học tập",
    tags: ["AI", "công nghệ", "học tiếng anh"],
    coverImage: "/blog/ai-learning.jpg",
    publishedAt: "2024-10-15",
    readTime: 10,
    views: 2845,
    likes: 201,
  },
  {
    id: "6",
    title: "10 Podcast Tiếng Anh Tốt Nhất Cho Người Học",
    excerpt:
      "Danh sách các podcast chất lượng giúp bạn cải thiện kỹ năng nghe và mở rộng từ vựng.",
    content: `
      <p>Nghe podcast là cách tuyệt vời để cải thiện khả năng nghe hiểu tiếng Anh trong khi làm việc khác.</p>
      
      <h2>Top Podcast đề xuất</h2>
      <ol>
        <li>ESL Pod - Dành cho người mới bắt đầu</li>
        <li>The English We Speak - BBC Learning English</li>
        <li>All Ears English - Học tiếng Anh Mỹ</li>
      </ol>
    `,
    author: {
      name: "Trần Thị B",
      avatar: "/avatars/author-2.jpg",
      role: "Chuyên gia phát âm",
      bio: "Chuyên gia phát âm với 8 năm kinh nghiệm, tốt nghiệp thạc sĩ ngôn ngữ học tại Úc.",
    },
    category: "Mẹo học tập",
    tags: ["podcast", "luyện nghe", "học tiếng anh"],
    coverImage: "/blog/podcast-list.jpg",
    publishedAt: "2024-10-12",
    readTime: 5,
    views: 1432,
    likes: 87,
  },
  {
    id: "7",
    title: "Cách Học Từ Vựng Tiếng Anh Nhanh Và Nhớ Lâu",
    excerpt:
      "Khám phá các phương pháp ghi nhớ từ vựng hiệu quả, từ flashcard đến mind map.",
    content: `
      <p>Việc học từ vựng là nền tảng quan trọng trong quá trình học tiếng Anh. Dưới đây là những phương pháp hiệu quả nhất.</p>
      
      <h2>1. Sử dụng Flashcard thông minh</h2>
      <p>Flashcard kỹ thuật số giúp bạn ôn tập theo hệ thống spaced repetition, tối ưu hóa thời gian học.</p>
      
      <h2>2. Học từ trong ngữ cảnh</h2>
      <p>Đừng chỉ học từ đơn lẻ. Hãy học từ trong câu, trong đoạn văn để hiểu cách sử dụng.</p>
      
      <h2>3. Tạo liên kết với hình ảnh</h2>
      <p>Liên kết từ vựng với hình ảnh giúp não bộ ghi nhớ lâu hơn nhiều lần.</p>
    `,
    author: {
      name: "Phạm Thị D",
      avatar: "/avatars/author-4.jpg",
      role: "Chuyên gia từ vựng",
      bio: "Chuyên gia từ vựng và tâm lý học nhận thức, nghiên cứu về phương pháp ghi nhớ hiệu quả.",
    },
    category: "Từ vựng",
    tags: ["từ vựng", "ghi nhớ", "flashcard"],
    coverImage: "/blog/vocabulary-methods.jpg",
    publishedAt: "2024-10-08",
    readTime: 6,
    views: 1876,
    likes: 103,
  },
  {
    id: "8",
    title: "Luyện Nghe Tiếng Anh Qua Phim Ảnh: Bí Quyết Thành Công",
    excerpt:
      "Hướng dẫn chi tiết cách sử dụng phim ảnh để cải thiện kỹ năng nghe hiệu quả.",
    content: `
      <p>Xem phim không chỉ giải trí mà còn là phương pháp học tiếng Anh tuyệt vời nếu bạn biết cách.</p>
      
      <h2>1. Chọn phim phù hợp trình độ</h2>
      <p>Bắt đầu với phim hoạt hình, sitcom có ngôn ngữ đơn giản trước khi chuyển sang phim phức tạp hơn.</p>
      
      <h2>2. Xem với phụ đề tiếng Anh</h2>
      <p>Đừng xem với phụ đề tiếng Việt. Hãy dùng phụ đề tiếng Anh để vừa nghe vừa đọc.</p>
      
      <h2>3. Xem lại nhiều lần</h2>
      <p>Xem cùng một đoạn phim 3-5 lần để nắm rõ cách phát âm và ngữ điệu.</p>
    `,
    author: {
      name: "Trần Thị B",
      avatar: "/avatars/author-2.jpg",
      role: "Chuyên gia phát âm",
      bio: "Chuyên gia phát âm với 8 năm kinh nghiệm, tốt nghiệp thạc sĩ ngôn ngữ học tại Úc.",
    },
    category: "Phát âm",
    tags: ["luyện nghe", "phim ảnh", "phát âm"],
    coverImage: "/blog/movies-learning.jpg",
    publishedAt: "2024-10-05",
    readTime: 7,
    views: 2103,
    likes: 124,
  },
  {
    id: "9",
    title: "Ngữ Pháp Tiếng Anh: Thì Hiện Tại Hoàn Thành",
    excerpt:
      "Giải thích chi tiết về thì hiện tại hoàn thành với ví dụ dễ hiểu và bài tập thực hành.",
    content: `
      <p>Thì hiện tại hoàn thành là một trong những thì khó nhất trong tiếng Anh. Hãy cùng tìm hiểu cách sử dụng chính xác.</p>
      
      <h2>Cấu trúc</h2>
      <p>Subject + have/has + Past Participle (V3)</p>
      
      <h2>Khi nào sử dụng</h2>
      <p>Dùng để diễn tả hành động xảy ra trong quá khứ nhưng còn liên quan đến hiện tại.</p>
      
      <h2>Ví dụ</h2>
      <p>I have lived in Hanoi for 5 years. (Tôi đã sống ở Hà Nội được 5 năm - và vẫn đang sống)</p>
    `,
    author: {
      name: "Lê Văn C",
      avatar: "/avatars/author-3.jpg",
      role: "Giáo viên ngữ pháp",
      bio: "Giáo viên ngữ pháp với 12 năm kinh nghiệm, chuyên giúp học viên hiểu và áp dụng ngữ pháp dễ dàng.",
    },
    category: "Ngữ pháp",
    tags: ["ngữ pháp", "thì", "present perfect"],
    coverImage: "/blog/present-perfect.jpg",
    publishedAt: "2024-10-01",
    readTime: 8,
    views: 1654,
    likes: 92,
  },
  {
    id: "10",
    title: "Bí Quyết Nói Tiếng Anh Tự Tin Trước Đám Đông",
    excerpt:
      "Vượt qua nỗi sợ nói tiếng Anh trước nhiều người với những tips thực tế.",
    content: `
      <p>Nhiều người học tiếng Anh tốt nhưng lại sợ nói trước đám đông. Đây là cách khắc phục.</p>
      
      <h2>1. Chuẩn bị kỹ lưỡng</h2>
      <p>Luyện tập trước gương, ghi âm lại và nghe để cải thiện.</p>
      
      <h2>2. Bắt đầu với nhóm nhỏ</h2>
      <p>Thuyết trình trước bạn bè, đồng nghiệp trước khi nói trước đám đông lớn.</p>
      
      <h2>3. Chấp nhận sai sót</h2>
      <p>Đừng lo lắng về việc mắc lỗi. Người nghe quan tâm đến nội dung hơn là ngữ pháp.</p>
    `,
    author: {
      name: "Nguyễn Văn A",
      avatar: "/avatars/author-1.jpg",
      role: "Giảng viên tiếng Anh",
      bio: "10 năm kinh nghiệm giảng dạy tiếng Anh, chuyên về phương pháp học hiện đại và công nghệ giáo dục.",
    },
    category: "Mẹo học tập",
    tags: ["nói tiếng anh", "tự tin", "thuyết trình"],
    coverImage: "/blog/public-speaking.jpg",
    publishedAt: "2024-09-28",
    readTime: 6,
    views: 1987,
    likes: 115,
  },
  {
    id: "11",
    title: "Cách Sử Dụng Phrasal Verbs Trong Giao Tiếp Hàng Ngày",
    excerpt:
      "Tổng hợp những phrasal verbs phổ biến nhất và cách dùng trong hội thoại.",
    content: `
      <p>Phrasal verbs là phần không thể thiếu trong tiếng Anh giao tiếp. Hãy học cách sử dụng chúng tự nhiên.</p>
      
      <h2>Phrasal Verbs thường gặp</h2>
      <ul>
        <li>Get up - Thức dậy</li>
        <li>Turn on/off - Bật/tắt</li>
        <li>Look for - Tìm kiếm</li>
        <li>Give up - Từ bỏ</li>
      </ul>
      
      <h2>Mẹo ghi nhớ</h2>
      <p>Học phrasal verbs trong ngữ cảnh, không học thuộc lòng danh sách.</p>
    `,
    author: {
      name: "Phạm Thị D",
      avatar: "/avatars/author-4.jpg",
      role: "Chuyên gia từ vựng",
      bio: "Chuyên gia từ vựng và tâm lý học nhận thức, nghiên cứu về phương pháp ghi nhớ hiệu quả.",
    },
    category: "Từ vựng",
    tags: ["phrasal verbs", "từ vựng", "giao tiếp"],
    coverImage: "/blog/phrasal-verbs.jpg",
    publishedAt: "2024-09-25",
    readTime: 7,
    views: 1723,
    likes: 96,
  },
  {
    id: "12",
    title: "Học Ngữ Pháp Qua Bài Hát Tiếng Anh",
    excerpt: "Phương pháp học ngữ pháp thú vị và hiệu quả thông qua âm nhạc.",
    content: `
      <p>Âm nhạc là công cụ tuyệt vời để học ngữ pháp một cách tự nhiên và thú vị.</p>
      
      <h2>Tại sao nên học qua bài hát?</h2>
      <p>Bài hát giúp bạn ghi nhớ cấu trúc ngữ pháp dễ dàng hơn nhờ giai điệu và lời lặp lại.</p>
      
      <h2>Cách học hiệu quả</h2>
      <ol>
        <li>Chọn bài hát có lời rõ ràng</li>
        <li>Đọc lyrics và phân tích cấu trúc</li>
        <li>Hát theo để ghi nhớ</li>
      </ol>
    `,
    author: {
      name: "Lê Văn C",
      avatar: "/avatars/author-3.jpg",
      role: "Giáo viên ngữ pháp",
      bio: "Giáo viên ngữ pháp với 12 năm kinh nghiệm, chuyên giúp học viên hiểu và áp dụng ngữ pháp dễ dàng.",
    },
    category: "Ngữ pháp",
    tags: ["ngữ pháp", "bài hát", "âm nhạc"],
    coverImage: "/blog/songs-grammar.jpg",
    publishedAt: "2024-09-20",
    readTime: 5,
    views: 1456,
    likes: 83,
  },
];

// Featured posts (for homepage or sidebar)
export const featuredPosts = blogPosts.slice(0, 3);

// Popular posts
export const popularPosts = [...blogPosts]
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

// Utility function to get post by ID
export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

// Utility function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "all") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
};

// Utility function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
