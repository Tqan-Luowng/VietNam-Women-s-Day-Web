import type { AppContent } from '../types';

export const initialContent: AppContent = {
  generalLetter:
    "Nhân ngày Phụ nữ Việt Nam 20/10, con/cháu xin gửi trọn vẹn tình cảm, lòng biết ơn sâu sắc và sự kính trọng vô bờ bến đến tất cả những người phụ nữ tuyệt vời trong gia đình mình: Bà Ngoại, Bá Phương, Bá Phong, Mẹ, Mợ Lan, Mợ Chanh, Chị Trang, Chị Ngọc, Chị Ánh, Bảo An và Ngọc Anh. Cảm ơn mọi người đã luôn là hậu phương ấm êm, mang lại nụ cười, tình yêu thương và sự dịu dàng cho mái ấm của chúng ta. Chúc một nửa dịu dàng của thế giới luôn rạng ngời, dồi dào sức khỏe, an yên và ngập tràn hạnh phúc mỗi ngày!",
  members: [
    {
      id: "ba-ngoai",
      name: "Bà Ngoại",
      callName: "Bà Ngoại kính yêu",
      accentColor: "#D97706",
      stickers: ["tea", "cake", "bear", "flower_cute"],
      photo: "/photos/ba-ngoai.jpg",
      message:
        "Kính chúc Bà Ngoại ngày 20/10 thật nhiều niềm vui, sống lâu trăm tuổi, dồi dào sức khỏe và luôn an yên bên con cháu! Cảm ơn Bà đã luôn là cây cao bóng cả, chở che và dành trọn tình thương bao la cho cả đại gia đình. Tụi con cháu yêu Bà Ngoại nhiều lắm ạ!",
      backNote: "Nụ cười hiền hậu của Bà Ngoại luôn là phúc lành ấm áp nhất cho cả gia đình!",
      quiz: [],
      badge: {
        title: "Cây Cao Bóng Cả & Trái Tim Vàng Của Gia Đình",
        description: "Điểm tựa bình an, phúc lành và cội nguồn yêu thương của toàn thể con cháu!"
      }
    },
    {
      id: "ba-phuong",
      name: "Bá Phương",
      callName: "Bá Phương kính mến",
      accentColor: "#DB2777",
      stickers: ["tea", "strawberry", "bear", "fruit"],
      photo: "/photos/ba-phuong.jpg",
      message:
        "Nhân ngày 20/10, con xin kính chúc Bá Phương luôn dồi dào sức khỏe, tràn đầy niềm vui, an khang thịnh vượng và hạnh phúc viên mãn! Cảm ơn Bá đã luôn chu đáo, yêu thương và vun đắp cho đại gia đình chúng ta luôn ấm áp, sum vầy.",
      backNote: "Kính chúc Bá Phương tuổi mới vạn sự hanh thông, luôn tươi trẻ và an vui mỗi ngày!",
      quiz: [],
      badge: {
        title: "Người Bá Chu Đáo & Đại Sứ Yêu Thương",
        description: "Tấm lòng đôn hậu, chu toàn và luôn quan tâm săn sóc cho đàn con cháu!"
      }
    },
    {
      id: "ba-phong",
      name: "Bá Phong",
      callName: "Bá Phong kính quý",
      accentColor: "#9333EA",
      stickers: ["cake", "tea", "flower_cute", "bear"],
      photo: "/photos/ba-phong.jpg",
      message:
        "Con kính chúc Bá Phong ngày 20/10 ngập tràn niềm vui, sức khỏe dồi dào, tâm hồn luôn thư thái, thảnh thơi và rạng ngời hạnh phúc! Tụi con luôn biết ơn sự ấm áp, đôn hậu và những lời dặn dò quý báu của Bá.",
      backNote: "Chúc Bá Phong mỗi ngày đều ngập tràn nụ cười, may mắn và vạn sự như ý!",
      quiz: [],
      badge: {
        title: "Người Bá Đôn Hậu & Điểm Tựa Ấm Áp",
        description: "Người phụ nữ dịu dàng, sâu sắc và luôn đem lại nguồn năng lượng an lành cho gia đình!"
      }
    },
    {
      id: "me",
      name: "Mẹ",
      callName: "Mẹ yêu thương",
      accentColor: "#E8799A",
      stickers: ["strawberry", "tea", "cake", "bear"],
      photo: "/photos/me.jpg",
      message:
        "Cảm ơn Mẹ vì cả cuộc đời luôn tần tảo sớm hôm lo cho gia đình, từ những bữa cơm thơm lừng ấm cúng đến từng lời dặn dò ân cần. Mẹ là chỗ dựa bình yên và thiêng liêng nhất trong tim con. Chúc Mẹ yêu ngày 20/10 thật nhiều niềm vui, luôn mạnh khỏe, trẻ trung và mỗi ngày trôi qua đều ngập tràn tiếng cười!",
      backNote: "Nụ cười rạng ngời của Mẹ chính là điều quý giá và thiêng liêng nhất của chúng con!",
      quiz: [],
      badge: {
        title: "Nữ Hoàng Du Lịch",
        description: "Người phụ nữ vĩ đại nhất trần đời, luôn sưởi ấm ngọn lửa hạnh phúc cho cả gia đình!"
      }
    },
    {
      id: "mo-lan",
      name: "Mợ Lan",
      callName: "Mợ Lan thân thương",
      accentColor: "#FB7185",
      stickers: ["dango", "bunny", "boba", "cake"],
      photo: "/photos/mo-lan.jpg",
      message:
        "Nhân ngày Phụ nữ Việt Nam 20/10, cháu chúc Mợ Lan luôn luôn tươi trẻ, rạng ngời, công việc suôn sẻ, gia đình luôn đầm ấm và ngập tràn niềm vui! Cảm ơn Mợ Lan đã luôn mang đến tiếng cười rộn rã và sự khéo léo, chu đáo cho cả nhà.",
      backNote: "Chúc Mợ Lan lúc nào cũng trẻ trung, duyên dáng và tràn đầy năng lượng tích cực!",
      quiz: [],
      badge: {
        title: "Nữ Thần Tri Thức",
        description: "Người mợ tươi vui, khéo léo và luôn mang lại bầu không khí ngọt ngào, rạng rỡ!"
      }
    },
    {
      id: "mo-chanh",
      name: "Mợ Chanh",
      callName: "Mợ Lemon",
      accentColor: "#10B981",
      stickers: ["fruit", "boba", "bunny", "tea"],
      photo: "/photos/mo-chanh.jpg",
      message:
        "Chúc Mợ Chanh ngày 20/10 siêu rực rỡ, ngày càng trẻ đẹp, lúc nào cũng tươi rói như hoa mùa xuân, buôn may bán đắt và vạn sự như ý! Cảm ơn Mợ Chanh vì những câu chuyện hài hước và năng lượng vui vẻ mỗi lần cả nhà hội tụ.",
      backNote: "Chúc Mợ Chanh luôn rạng rỡ tiếng cười, hạnh phúc đong đầy và tâm hồn mãi thanh xuân!",
      quiz: [],
      badge: {
        title: "Nữ Hoàng Sắc Sảo",
        description: "Người mợ hóm hỉnh, nhiệt tình và luôn thắp sáng niềm vui cho tất cả mọi người!"
      }
    },
    {
      id: "chi-trang",
      name: "Chị Trang",
      callName: "Chị Giáo Phong Cách",
      accentColor: "#EC4899",
      stickers: ["donut", "boba", "bunny", "icecream"],
      photo: "/photos/chi-trang.jpg",
      message:
        "Chúc Chị Trang ngày 20/10 thật rực rỡ, visual ngày càng thăng hạng, công việc hanh thông, ví tiền rủng rỉnh và luôn hạnh phúc trọn vẹn! Cảm ơn Chị đã luôn là người chị dịu dàng, biết quan tâm và chia sẻ cùng mọi người.",
      backNote: "Chúc Chị Trang luôn tự tin tỏa sáng và đạt được mọi điều mình mơ ước nhé!",
      quiz: [],
      badge: {
        title: "Chị Giáo Tài Ba & Quý Cô Dịu Dàng",
        description: "Người chị duyên dáng, thông minh và luôn toát lên vẻ đẹp rạng ngời!"
      }
    },
    {
      id: "chi-ngoc",
      name: "Chị Ngọc",
      callName: "Chị Ọc Duyên Dáng",
      accentColor: "#bb2e91ff",
      stickers: ["cake", "boba", "bunny", "fruit"],
      photo: "/photos/chi-ngoc.jpg",
      message:
        "Nhân ngày 20/10, chúc Chị Ngọc luôn xinh xắn như một bông hoa, công danh sự nghiệp bứt phá thành công rực rỡ, gặp thật nhiều may mắn và luôn vui tươi yêu đời! Cảm ơn Chị luôn là người chị tâm lý, nhiệt tình và đáng tin cậy của cả nhà.",
      backNote: "Chúc Chị Ngọc mỗi ngày đều là một ngày tuyệt vời ngập tràn may mắn và niềm vui!",
      quiz: [],
      badge: {
        title: "Nàng Ọc điệu đà",
        description: "Người chị sắc sảo, tài năng và luôn tràn đầy năng lượng tích cực!"
      }
    },
    {
      id: "chi-anh",
      name: "Chị Ánh",
      callName: "Chị cả Á",
      accentColor: "#06B6D4",
      stickers: ["icecream", "strawberry", "boba", "donut"],
      photo: "/photos/chi-anh.jpg",
      message:
        "Chúc Chị Ánh ngày 20/10 luôn lung linh tỏa sáng đúng như tên gọi của mình! Chúc Chị luôn dồi dào sức khỏe, công việc gặt hái nhiều trái ngọt, tình duyên như ý và nụ cười rạng rỡ luôn nở trên môi.",
      backNote: "Ánh sáng ấm áp và nụ cười của Chị luôn tiếp thêm động lực cho gia đình mình!",
      quiz: [],
      badge: {
        title: "Chị đại khéo léo & Chị cả phong cách",
        description: "Người chị năng động, tươi sáng và luôn lan tỏa tinh thần lạc quan, vui vẻ!"
      }
    },
    {
      id: "bao-an",
      name: "Bảo An",
      callName: "Bảo An đáng yêu",
      accentColor: "#F59E0B",
      stickers: ["mochi", "cake", "bear", "flower_cute"],
      photo: "/photos/bao-an.jpg",
      message:
        "Chúc bé Bảo An ngày 20/10 thật nhiều niềm vui, luôn ngoan ngoãn, hay ăn chóng lớn, học hành thật giỏi và ngày càng xinh xắn đáng yêu! Cả nhà ai cũng thương và cưng Bảo An nhất quả đất luôn đó nha!",
      backNote: "Bảo An mãi là viên ngọc quý nhỏ mang đến tiếng cười rộn rã cho cả gia đình!",
      quiz: [],
      badge: {
        title: "Bảo An thối thối đáng yêu",
        description: "Cô bé lém lỉnh, ngoan ngoãn và luôn được tất cả ông bà, cha mẹ, cô chú yêu thương hết mực!"
      }
    },
    {
      id: "ngoc-anh",
      name: "Ngọc Anh",
      callName: "Cục đường út",
      accentColor: "#F43F5E",
      stickers: ["bunny", "icecream", "boba", "mochi"],
      photo: "/photos/ngoc-anh.jpg",
      message:
        "Chúc Ngọc Anh ngày Phụ nữ Việt Nam 20/10 thật rực rỡ, xinh xắn như công chúa, học tập xuất sắc, luôn vui tươi hồn nhiên và đón nhận muôn vàn điều may mắn ngọt ngào nhất! Chúc em luôn hạnh phúc và tự tin tỏa sáng.",
      backNote: "Chúc Ngọc Anh luôn giữ trọn nụ cười trong trẻo, đáng yêu và trái tim nhân hậu!",
      quiz: [],
      badge: {
        title: "Công Chúa Dễ Thương & Nụ Cười Thiên Thần",
        description: "Cô bé thông minh, đáng yêu, mang đến nguồn sinh khí tươi vui rộn ràng cho cả tổ ấm!"
      }
    }
  ]
};
