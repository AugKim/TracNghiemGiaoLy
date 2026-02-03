/**
 * MODEL - Dữ liệu và trạng thái Quiz
 * Chứa: danh sách đề thi, câu hỏi đang chơi, state hiện tại
 */

// Ngân hàng câu hỏi (dùng chung cho các đề)
const CAU_HOI_GIAO_LY = [
    { question: "Theo Giáo lý, Thiên Chúa là Đấng như thế nào?", answers: ["Đấng duy nhất, hằng sống, chân thật và yêu thương vô cùng", "Đấng quyền năng nhưng nghiêm khắc và xa cách con người", "Đấng được sinh ra trước muôn đời và có hình hài cụ thể", "Đấng chỉ ngự trên trời cao và không can thiệp vào trần gian"], correct: 0 },
    { question: "Vì sao mắt chúng ta không thể nhìn thấy Thiên Chúa?", answers: ["Vì Thiên Chúa ở quá xa con người", "Vì Thiên Chúa là Đấng thiêng liêng, không có thân xác", "Vì mắt con người bị che khuất bởi tội lỗi", "Vì Thiên Chúa ẩn mình trong bóng tối"], correct: 1 },
    { question: "Lý trí tự nhiên của con người có thể nhận biết Thiên Chúa qua đâu?", answers: ["Qua giấc mơ và điềm báo", "Qua sách báo và phim ảnh", "Qua thiên nhiên và tiếng nói lương tâm", "Qua sự giàu sang và quyền lực"], correct: 2 },
    { question: "Trong mầu nhiệm Thiên Chúa Ba Ngôi, Chúa Thánh Thần là Ngôi thứ mấy?", answers: ["Ngôi Thứ Nhất", "Ngôi Thứ Hai", "Ngôi Thứ Ba", "Không phân biệt ngôi vị"], correct: 2 },
    { question: "Chúa Thánh Thần bởi ai mà ra?", answers: ["Chỉ bởi Chúa Cha", "Bởi Chúa Cha và Chúa Con (Filioque)", "Chỉ bởi Chúa Con", "Tự nhiên mà có"], correct: 1 },
    { question: "Chúa Giêsu đã gọi Chúa Thánh Thần bằng danh hiệu nào?", answers: ["Đấng Tạo Hóa", "Đấng Phán Xét", "Đấng Bảo Trợ", "Vua các Vua"], correct: 2 },
    { question: "Trong Cựu Ước, Chúa Thánh Thần thường được gọi là gì?", answers: ["Thần Khí của Thiên Chúa", "Ngôi Lời Nhập Thể", "Đấng Emmanuel", "Vị Ngôn Sứ vĩ đại"], correct: 0 },
    { question: "Cầu nguyện được định nghĩa là gì?", answers: ["Đọc các kinh thật nhanh và thuộc lòng", "Gặp gỡ và thưa chuyện với Chúa", "Xin Chúa ban cho nhiều tiền bạc", "Suy nghĩ về những lo âu trong cuộc sống"], correct: 1 },
    { question: "Chúa Giêsu đã cầu nguyện tại Vườn Cây Dầu (Ghetsêmani) vào thời điểm nào?", answers: ["Khi Ngài mới sinh ra tại Bêlem", "Trước khi Ngài làm phép lạ hóa bánh ra nhiều", "Sau bữa Tiệc Ly, trước khi chịu khổ nạn", "Sau khi Ngài sống lại từ cõi chết"], correct: 2 },
    { question: "Tâm tình của Chúa Giêsu khi cầu nguyện trong vườn Cây Dầu là gì?", answers: ["Vui vẻ và hân hoan", "Giận dữ và oán trách", "Khiêm tốn, vâng phục và phó thác", "Sợ hãi và muốn bỏ cuộc"], correct: 2 },
    { question: "Qua tiên tri Isaia, Thiên Chúa khẳng định tình yêu của Ngài đối với con người như thế nào?", answers: ["Yêu thương hơn cả người mẹ yêu con mình", "Yêu thương nhưng có điều kiện", "Yêu thương như một vị vua đối với thần dân", "Chỉ yêu thương những người công chính"], correct: 0 },
    { question: "Thiên Chúa dựng nên trời đất muôn vật để làm gì?", answers: ["Để con người phải sợ hãi quyền năng Chúa", "Để cho con người hưởng dùng", "Để Ngài ngắm nhìn một mình", "Để thử thách lòng tin của con người"], correct: 1 },
    { question: "Trong Hội Thánh có những bậc sống chính nào?", answers: ["Giáo sĩ, tu sĩ (đời sống thánh hiến), và giáo dân", "Ba thành phần: Giám mục, Linh mục và Giáo dân", "Bốn thành phần: Giáo hoàng, Giám mục, Linh mục, Tu sĩ", "Chỉ một thành phần duy nhất là con cái Chúa"], correct: 0 },
    { question: "Ngày Chúa Giêsu trở lại lần thứ hai (cánh chung) sẽ đến như thế nào?", answers: ["Vào một ngày lễ lớn đã định trước", "Được báo trước 3 ngày để chuẩn bị", "Đến cách bất thình lình, không ai biết trước", "Khi con người đã hoàn toàn thánh thiện"], correct: 2 },
    { question: "Để cám ơn Chúa vì Ngài đã tạo dựng muôn vật, chúng ta cần làm gì ngoài việc nói lời cám ơn?", answers: ["Chỉ cần đi lễ ngày Chúa Nhật là đủ", "Làm việc để góp phần bảo vệ và xây dựng trái đất tốt đẹp hơn", "Không cần làm gì thêm vì Chúa không đòi hỏi", "Chỉ cần cầu nguyện xin ơn cho bản thân"], correct: 1 }
];
const Trac_Nghiem_Giao_Ly_So_Cap = [
    {
        question: "Theo Giáo lý, Thiên Chúa là Đấng như thế nào?",
        answers: [
            "Đấng duy nhất, hằng sống, chân thật và yêu thương vô cùng",
            "Đấng quyền năng nhưng nghiêm khắc và xa cách con người",
            "Đấng được sinh ra trước muôn đời và có hình hài cụ thể",
            "Đấng chỉ ngự trên trời cao và không can thiệp vào trần gian"
        ],
        "correct": 0
    },
    {
        question: "Vì sao mắt chúng ta không thể nhìn thấy Thiên Chúa?",
        answers: [
            "Vì Thiên Chúa ở quá xa con người",
            "Vì Thiên Chúa là Đấng thiêng liêng, không có thân xác",
            "Vì mắt con người bị che khuất bởi tội lỗi",
            "Vì Thiên Chúa ẩn mình trong bóng tối"
        ],
        "correct": 1
    },
    {
        question: "Mầu nhiệm Một Chúa Ba Ngôi dạy ta điều gì?",
        answers: [
            "Có ba Thiên Chúa riêng biệt cai trị thế giới",
            "Chúa Cha, Chúa Con và Chúa Thánh Thần là ba tên gọi của một ngôi vị",
            "Chỉ có một Thiên Chúa duy nhất, nhưng Ngài có Ba Ngôi riêng biệt",
            "Chúa Cha lớn hơn Chúa Con và Chúa Thánh Thần"
        ],
        "correct": 2
    },
    {
        question: "Thiên Chúa tạo dựng con người giống hình ảnh ai?",
        answers: [
            "Giống hình ảnh các thiên thần",
            "Giống hình ảnh Thiên Chúa",
            "Giống hình ảnh loài linh trưởng",
            "Giống hình ảnh vũ trụ"
        ],
        "correct": 1
    },
    {
        question: "Tội tổ tông là gì?",
        answers: [
            "Là tội do chính chúng ta phạm phải khi mới sinh ra",
            "Là tội của ông bà tổ tiên truyền lại qua đường máu huyết",
            "Là tình trạng mất ân nghĩa thánh thiện nguyên thủy do A-đam và E-và phạm tội",
            "Là mọi tội lỗi con người phạm phải trong suốt cuộc đời"
        ],
        "correct": 2
    },
    {
        question: "Tên 'Giêsu' có nghĩa là gì?",
        "answers": [
            "Đấng được xức dầu",
            "Thiên Chúa ở cùng chúng ta",
            "Thiên Chúa cứu độ",
            "Vua dân Do Thái"
        ],
        "correct": 2
    },
    {
        question: "Tên 'Kitô' (Christ) có nghĩa là gì?",
        "answers": [
            "Đấng Cứu Thế",
            "Đấng được xức dầu",
            "Ngôi Lời",
            "Con Thiên Chúa"
        ],
        "correct": 1
    },
    {
        question: "Chúa Giêsu có bao nhiêu bản tính?",
        "answers": [
            "Chỉ có một bản tính Thiên Chúa",
            "Chỉ có một bản tính loài người",
            "Hai bản tính: Thiên Chúa và loài người",
            "Ba bản tính: Thiên Chúa, loài người và thần linh"
        ],
        "correct": 2
    },
    {
        question: "Mầu nhiệm Ngôi Lời Nhập Thể là gì?",
        "answers": [
            "Chúa Cha xuống thế làm người",
            "Chúa Thánh Thần hiện xuống",
            "Ngôi Hai Thiên Chúa xuống thế làm người",
            "Các ngôn sứ được Chúa sai đến"
        ],
        "correct": 2
    },
    {
        question: "Đức Mẹ Đồng Trinh có nghĩa là gì?",
        "answers": [
            "Mẹ không có con cái nào khác ngoài Chúa Giêsu",
            "Mẹ trọn đời đồng trinh trước, trong và sau khi sinh Chúa Giêsu",
            "Mẹ không kết hôn với Thánh Giuse",
            "Mẹ không vướng mắc tội tổ tông"
        ],
        "correct": 1
    },
    {
        question: "Đặc ân Vô Nhiễm Nguyên Tội của Đức Mẹ nghĩa là gì?",
        "answers": [
            "Mẹ không bao giờ phạm tội trọng",
            "Mẹ được gìn giữ khỏi tội tổ tông ngay từ lúc thụ thai",
            "Mẹ được lên trời cả hồn lẫn xác",
            "Mẹ sinh Chúa Giêsu mà không đau đớn"
        ],
        "correct": 1
    },
    {
        question: "Chúa Giêsu lập Bí tích Thánh Thể khi nào?",
        "answers": [
            "Khi Ngài hóa bánh ra nhiều",
            "Trong bữa Tiệc Ly (Bữa Tối Sau Hết)",
            "Trên thánh giá",
            "Sau khi phục sinh"
        ],
        "correct": 1
    },
    {
        question: "Bí tích là gì?",
        "answers": [
            "Là những nghi thức văn hóa của Giáo hội",
            "Bí tích là dấu chỉ hữu hình do Đức Kitô thiết lập để ban ân sủng",
            "Là những lời cầu nguyện đặc biệt linh nghiệm",
            "Là luật lệ buộc mọi người phải tuân giữ"
        ],
        "correct": 1
    },
    {
        question: "Có bao nhiêu Bí tích trong Giáo hội Công giáo?",
        "answers": [
            "3 Bí tích",
            "7 Bí tích",
            "9 Bí tích",
            "12 Bí tích"
        ],
        "correct": 1
    },
    {
        question: "Bí tích nào xóa bỏ tội tổ tông?",
        "answers": [
            "Bí tích Thêm Sức",
            "Bí tích Thánh Thể",
            "Bí tích Rửa Tội",
            "Bí tích Hòa Giải"
        ],
        "correct": 2
    },
    {
        question: "Bí tích nào ban Chúa Thánh Thần để giúp ta sống đạo trưởng thành?",
        "answers": [
            "Bí tích Rửa Tội",
            "Bí tích Thêm Sức",
            "Bí tích Truyền Chức Thánh",
            "Bí tích Xức Dầu Bệnh Nhân"
        ],
        "correct": 1
    },
    {
        question: "Điều kiện để rước lễ (chịu Mình Thánh Chúa) là gì?",
        "answers": [
            "Ở trong ơn nghĩa Chúa (không mắc tội trọng), có lòng ngay lành và giữ chay Thánh Thể theo luật Hội Thánh",
            "Phải thuộc hết các kinh",
            "Phải đóng góp cho nhà thờ",
            "Chỉ cần đi lễ đúng giờ"
        ],
        "correct": 0
    },
    {
        question: "Trong Bí tích Hòa Giải, việc xét mình nghĩa là gì?",
        "answers": [
            "Nhớ lại những việc tốt đã làm",
            "Khiêm tốn nhìn nhận các tội đã phạm",
            "So sánh mình với người khác",
            "Đọc kinh Ăn Năn Tội"
        ],
        "correct": 1
    },
    {
        question: "Hội Thánh Công giáo có mấy đặc tính?",
        "answers": [
            "1 đặc tính: Thánh thiện",
            "2 đặc tính: Duy nhất và Tông truyền",
            "3 đặc tính: Duy nhất, Thánh thiện và Công giáo",
            "4 đặc tính: Duy nhất, Thánh thiện, Công giáo và Tông truyền"
        ],
        "correct": 3
    },
    {
        question: "Ai là Đấng kế vị Thánh Phêrô để lãnh đạo Hội Thánh?",
        "answers": [
            "Các Giám mục",
            "Đức Giáo Hoàng",
            "Các Linh mục",
            "Các Hồng Y"
        ],
        "correct": 1
    },
    {
        question: "Các Giám mục là người kế vị ai?",
        "answers": [
            "Chúa Giêsu",
            "Các Tông đồ",
            "Các tiên tri",
            "Vua Đavít"
        ],
        "correct": 1
    },
    {
        question: "Tứ chung (bốn sự sau cùng) của con người là gì?",
        "answers": [
            "Sinh, Lão, Bệnh, Tử",
            "Chết, Phán xét, Thiên đàng, Hỏa ngục",
            "Rửa tội, Thêm sức, Thánh thể, Hôn phối",
            "Tin, Cậy, Mến, Ăn năn"
        ],
        "correct": 1
    },
    {
        question: "Luyện ngục là nơi nào?",
        "answers": [
            "Nơi giam giữ các linh hồn tội lỗi đời đời",
            "Nơi thanh luyện các linh hồn trước khi vào Thiên đàng",
            "Nơi dành cho những người không tin Chúa",
            "Nơi ma quỷ cám dỗ con người"
        ],
        "correct": 1
    },
    {
        question: "Điều răn trọng nhất Chúa Giêsu dạy là gì?",
        "answers": [
            "Chớ giết người",
            "Thảo kính cha mẹ",
            "Mến Chúa và yêu người",
            "Giữ ngày Chúa Nhật"
        ],
        "correct": 2
    },
    {
        question: "Kinh Lạy Cha gồm mấy lời nguyện xin?",
        "answers": [
            "3 lời nguyện xin",
            "5 lời nguyện xin",
            "7 lời nguyện xin",
            "10 lời nguyện xin"
        ],
        "correct": 2
    },
    {
        question: "Mùa Phụng vụ nào chuẩn bị đón mừng Chúa Giáng Sinh?",
        "answers": [
            "Mùa Chay",
            "Mùa Phục Sinh",
            "Mùa Vọng",
            "Mùa Thường Niên"
        ],
        "correct": 2
    },
    {
        question: "Mùa Chay kéo dài bao lâu?",
        "answers": [
            "30 ngày",
            "40 ngày",
            "50 ngày",
            "1 tuần"
        ],
        "correct": 1
    },
    {
        question: "Tam Nhật Thánh bao gồm những ngày nào?",
        "answers": [
            "Thứ Hai, Thứ Ba, Thứ Tư Tuần Thánh",
            "Bắt đầu từ chiều Thứ Năm Tuần Thánh và kết thúc vào kinh chiều Chúa Nhật Phục Sinh",
            "Lễ Giáng Sinh, Lễ Phục Sinh, Lễ Hiện Xuống",
            "Ba ngày Tết Nguyên Đán"
        ],
        "correct": 1
    },
    {
        question: "Màu áo lễ tím thường được dùng trong mùa nào?",
        "answers": [
            "Mùa Giáng Sinh và Phục Sinh",
            "Mùa Thường Niên",
            "Mùa Vọng và Mùa Chay",
            "Mùa Vọng và Phục Sinh"
        ],
        "correct": 2
    },
    {
        question: "Thánh Lễ có hai phần chính là gì?",
        "answers": [
            "Phụng vụ Lời Chúa và Phụng vụ Thánh Thể",
            "Nhập lễ và Kết lễ",
            "Bài đọc và Bài giảng",
            "Dâng lễ và Hiệp lễ"
        ],
        "correct": 0
    },
    {
        question: "Tội trọng là gì?",
        "answers": [
            "Là lỗi nhẹ hàng ngày do yếu đuối",
            "Là vi phạm điều luật quan trọng, biết rõ là tội nặng và tự do ưng thuận hoàn toàn",
            "Là tội không thể tha thứ được",
            "Là tội do người khác xúi giục"
        ],
        "correct": 1
    },
    {
        question: "Ân sủng (ơn thánh) là gì?",
        "answers": [
            "Là phần thưởng vật chất Chúa ban",
            "Là sự trợ giúp nhưng không của Chúa để ta được sống đời đời",
            "Là tài năng thiên bẩm của con người",
            "Là sự may mắn trong cuộc sống"
        ],
        "correct": 1
    },
    {
        question: "Ba nhân đức đối thần là gì?",
        "answers": [
            "Khôn ngoan, Công bình, Dũng cảm",
            "Tin, Cậy, Mến",
            "Khiêm nhường, Nhịn nhục, Bác ái",
            "Vâng phục, Khó nghèo, Khiết tịnh"
        ],
        "correct": 1
    },
    {
        question: "Kinh Tin Kính tóm tắt điều gì?",
        "answers": [
            "Tóm tắt các kinh nguyện hằng ngày",
            "Tóm tắt Lịch sử cứu độ",
            "Tóm tắt những điều cốt yếu người Kitô hữu phải tin",
            "Tóm tắt Mười Điều Răn"
        ],
        "correct": 2
    },
    {
        question: "Ngày Chúa Nhật có ý nghĩa chính là gì?",
        "answers": [
            "Ngày nghỉ ngơi sau một tuần làm việc",
            "Ngày tưởng niệm Chúa Giêsu Phục Sinh",
            "Ngày dành cho gia đình",
            "Ngày để đi du lịch"
        ],
        "correct": 1
    },
    {
        question: "Điều răn thứ tư dạy ta điều gì?",
        "answers": [
            "Thờ phượng một Đức Chúa Trời",
            "Thảo kính cha mẹ",
            "Chớ giết người",
            "Chớ làm chứng gian"
        ],
        "correct": 1
    },
    {
        question: "Sự sống lại của thân xác nghĩa là gì?",
        "answers": [
            "Đầu thai kiếp khác (luân hồi)",
            "Linh hồn sống mãi còn thân xác tiêu tan",
            "Trong ngày tận thế, thân xác sẽ sống lại và kết hợp với linh hồn",
            "Sống lại trong ký ức người thân"
        ],
        "correct": 2
    },
    {
        question: "Các Thánh Thông Công nghĩa là gì?",
        "answers": [
            "Các Thánh trên trời thường họp nhau lại",
            "Sự hiệp thông giữa Giáo hội lữ hành, Giáo hội thanh luyện và Giáo hội khải hoàn",
            "Việc chia sẻ của cải vật chất trong xứ đạo",
            "Các tín hữu phải đi lễ chung với nhau"
        ],
        "correct": 1
    },
    {
        question: "Lương tâm là gì?",
        "answers": [
            "Là cảm xúc vui buồn của con người",
            "Là tiếng nói sâu thẳm trong tâm hồn bảo ta làm lành lánh dữ",
            "Là những quy định của xã hội",
            "Là sự sợ hãi bị trừng phạt"
        ],
        "correct": 1
    },
    {
        question: "Việc xức dầu Thánh (Dầu Chrisma) trong Bí tích Rửa tội có ý nghĩa gì?",
        "answers": [
            "Để chữa lành bệnh tật",
            "Để làm đẹp cho người được rửa tội",
            "Để ghi dấu ấn trở thành tư tế, ngôn sứ và vương đế",
            "Để xua đuổi ma quỷ"
        ],
        "correct": 2
    },
    {
        question: "Ai là tác giả chính của Kinh Thánh?",
        "answers": [
            "Các thánh sử",
            "Thiên Chúa",
            "Môsê",
            "Thánh Phaolô"
        ],
        "correct": 1
    },
    {
        question: "Kinh Thánh gồm bao nhiêu cuốn?",
        "answers": [
            "46 cuốn",
            "27 cuốn",
            "73 cuốn",
            "66 cuốn"
        ],
        "correct": 2
    },
    {
        question: "Tân Ước nói về điều gì chủ yếu?",
        "answers": [
            "Việc sáng tạo thế giới",
            "Lịch sử dân Ít-ra-en",
            "Cuộc đời, lời dạy và công trình cứu độ của Chúa Giêsu",
            "Các lời tiên tri về ngày tận thế"
        ],
        "correct": 2
    },
    {
        question: "Phúc Âm Nhất Lãm bao gồm các sách Tin Mừng nào?",
        "answers": [
            "Mát-thêu, Mác-cô, Lu-ca",
            "Mát-thêu, Mác-cô, Gio-an",
            "Mác-cô, Lu-ca, Gio-an",
            "Mát-thêu, Lu-ca, Gio-an"
        ],
        "correct": 0
    },
    {
        question: "Phép lạ đầu tiên Chúa Giêsu làm là ở đâu?",
        "answers": [
            "Tại bờ biển hồ Galilê",
            "Tại tiệc cưới Cana",
            "Tại thành Caphácnaum",
            "Tại Giêrusalem"
        ],
        "correct": 1
    },
    {
        question: "Biến cố Chúa Giêsu chịu phép rửa tại sông Gio-đan đánh dấu điều gì?",
        "answers": [
            "Kết thúc sứ vụ công khai",
            "Bắt đầu sứ vụ rao giảng công khai",
            "Ngài được sinh ra",
            "Ngài chịu chết"
        ],
        "correct": 1
    },
    {
        question: "Trên Thánh Giá, Chúa Giêsu đã trao phó Mẹ Maria cho ai?",
        "answers": [
            "Thánh Phêrô và Các Tông Đồ",
            "Thánh Gioan Tông đồ",
            "Thánh Ma-ri-a Mác-đa-la",
            "Ông Giô-xép A-ri-ma-thê"
        ],
        "correct": 1
    },
    {
        question: "Chúa Giêsu Phục Sinh hiện ra với ai đầu tiên trong Tin Mừng?",
        "answers": [
            "Thánh Phêrô",
            "Hai môn đệ trên đường Emmau",
            "Bà Maria Mácđala (hoặc các phụ nữ)",
            "Thánh Tôma"
        ],
        "correct": 2
    },
    {
        question: "Lễ Ngũ Tuần kỷ niệm biến cố gì?",
        "answers": [
            "Chúa Giêsu lên trời",
            "Chúa Thánh Thần ngự xuống trên các Tông đồ",
            "Chúa Giêsu sống lại",
            "Đức Mẹ hồn xác lên trời"
        ],
        "correct": 1
    },
    {
        question: "Mục đích tối hậu của đời người là gì?",
        "answers": [
            "Làm giàu và nổi tiếng",
            "Sống lâu và khỏe mạnh",
            "Nhận biết, yêu mến, phụng sự Chúa và được hưởng hạnh phúc đời đời",
            "Xây dựng một xã hội công bằng văn minh"
        ],
        "correct": 2
    }
];
const Trac_Nghiem_Giao_Ly_So_Cap_2 = [
    {
        question: "Có bao nhiêu ơn Chúa Thánh Thần?",
        answers: [
            "3 ơn",
            "7 ơn",
            "9 ơn",
            "12 ơn"
        ],
        correct: 1
    },
    {
        question: "Điều răn thứ năm 'Chớ giết người' cấm những điều gì?",
        answers: [
            "Cấm giết người, tự tử, phá thai và làm hại sức khỏe (thân thể)",
            "Chỉ cấm giết người bằng vũ khí",
            "Cấm săn bắt động vật",
            "Cấm chặt phá cây cối"
        ],
        correct: 0
    },
    {
        question: "Điều răn thứ sáu và thứ chín dạy ta điều gì?",
        answers: [
            "Sống trung thực, không gian dối",
            "Sống khiết tịnh trong tư tưởng và hành động",
            "Biết chia sẻ của cải",
            "Thờ phượng Chúa trên hết mọi sự"
        ],
        correct: 1
    },
    {
        question: "Điều răn thứ bảy 'Chớ lấy của người' cấm điều gì?",
        answers: [
            "Cấm trộm cắp, gian lận, cho vay nặng lãi và giữ của người khác trái phép",
            "Cấm buôn bán kinh doanh",
            "Cấm làm giàu chính đáng",
            "Cấm sở hữu tài sản riêng"
        ],
        correct: 0
    },
    {
        question: "Điều răn thứ tám dạy ta điều gì?",
        answers: [
            "Sống thành thật, làm chứng cho sự thật và tôn trọng danh dự người khác",
            "Phải nói tất cả mọi bí mật cho mọi người biết",
            "Không được im lặng trước đám đông",
            "Phải khen ngợi người khác dù họ làm sai"
        ],
        correct: 0
    },
    {
        question: "Có mấy Mối Phúc Thật (Bát Phúc)?",
        answers: [
            "7 mối",
            "8 mối",
            "10 mối",
            "12 mối"
        ],
        correct: 1
    },
    {
        question: "Mối phúc đầu tiên là gì?",
        answers: [
            "Phúc cho ai có tinh thần nghèo khó",
            "Phúc cho ai hiền lành",
            "Phúc cho ai khóc lóc",
            "Phúc cho ai xây dựng hòa bình"
        ],
        correct: 0
    },
    {
        question: "Kinh Mân Côi tóm tắt điều gì?",
        answers: [
            "Cuộc đời các Thánh Tử Đạo",
            "Toàn bộ Tin Mừng qua các mầu nhiệm Vui, Sáng, Thương, Mừng",
            "Các điều luật của Hội Thánh",
            "Lịch sử dân Do Thái"
        ],
        correct: 1
    },
    {
        question: "Bí tích Thêm Sức ban cho ta điều gì đặc biệt?",
        answers: [
            "Ơn tha tội tổ tông",
            "Sức mạnh của Chúa Thánh Thần để làm chứng cho Chúa",
            "Quyền cử hành thánh lễ",
            "Ơn chữa lành bệnh tật"
        ],
        correct: 1
    },
    {
        question: "Trong Thánh Lễ, bánh và rượu trở thành Mình và Máu Chúa Kitô khi nào?",
        answers: [
            "Khi giáo dân rước lễ",
            "Khi Linh mục đọc lời Truyền phép",
            "Khi Linh mục chuẩn bị lễ vật",
            "Khi ca đoàn hát bài hiệp lễ"
        ],
        correct: 1
    },
    {
        question: "Mầu nhiệm 'Biến đổi bản thể' (Transubstantiation) trong Bí tích Thánh Thể nghĩa là gì?",
        answers: [
            "Bánh và rượu thay đổi hình dạng bên ngoài",
            "Bánh và rượu vẫn giữ nguyên bản chất nhưng mang ý nghĩa mới",
            "Bản thể bánh và rượu biến đổi hoàn toàn thành bản thể Mình và Máu Chúa, dù hình sắc vẫn còn",
            "Chúa Giêsu hiện diện bên cạnh bánh và rượu"
        ],
        correct: 2
    },
    {
        question: "Ai có quyền ban Bí tích Truyền Chức Thánh?",
        answers: [
            "Linh mục chánh xứ",
            "Giám mục",
            "Giáo dân đạo đức",
            "Các Tu sĩ"
        ],
        correct: 1
    },
    {
        question: "Ba cấp bậc của Bí tích Truyền Chức Thánh là gì?",
        answers: [
            "Giáo hoàng, Hồng y, Giám mục",
            "Giám mục, Linh mục, Phó tế",
            "Linh mục, Tu sĩ, Giáo dân",
            "Lễ sinh, Ca đoàn, Trùm họ"
        ],
        correct: 1
    },
    {
        question: "Mục đích của Bí tích Hôn Phối là gì?",
        answers: [
            "Để hai người yêu nhau được sống chung hợp pháp",
            "Sự thiện ích của đôi vợ chồng và việc sinh sản, giáo dục con cái",
            "Để duy trì nòi giống cho dòng họ",
            "Để tổ chức tiệc cưới linh đình và đi du lịch"
        ],
        correct: 1
    },
    {
        question: "Đặc tính căn bản của Hôn nhân Công giáo là gì?",
        answers: [
            "Đơn nhất và Bất khả phân ly (Một vợ một chồng và không được ly dị)",
            "Đơn nhất và có thể phân ly",
            "Có thể lấy nhiều vợ hoặc chồng",
            "Chỉ là hợp đồng dân sự tạm thời"
        ],
        correct: 0
    },
    {
        question: "Kinh 'Lạy Nữ Vương' thường được đọc vào lúc nào?",
        answers: [
            "Đầu Thánh Lễ",
            "Cuối giờ kinh Mân Côi",
            "Trước khi ăn cơm",
            "Khi thức dậy"
        ],
        correct: 1
    },
    {
        question: "Thứ Sáu Tuần Thánh, Giáo hội tưởng niệm điều gì?",
        answers: [
            "Chúa Giêsu lập Bí tích Thánh Thể",
            "Chúa Giêsu chịu chết trên Thánh giá",
            "Chúa Giêsu sống lại",
            "Chúa Giêsu vào thành Giêrusalem"
        ],
        correct: 1
    },
    {
        question: "Thứ Tư Lễ Tro là ngày khởi đầu mùa nào?",
        answers: [
            "Mùa Vọng",
            "Mùa Giáng Sinh",
            "Mùa Chay",
            "Mùa Phục Sinh"
        ],
        correct: 2
    },
    {
        question: "Luật Hội Thánh buộc kiêng thịt và ăn chay vào những ngày nào?",
        answers: [
            "Mọi ngày thứ Sáu trong năm",
            "Thứ Tư Lễ Tro và Thứ Sáu Tuần Thánh",
            "Ngày Chúa Nhật và các ngày Lễ Trọng",
            "Ngày rằm và mồng một"
        ],
        correct: 1
    },
    {
        question: "Màu đỏ trong Phụng vụ được dùng vào những dịp nào?",
        answers: [
            "Lễ trong mùa Giáng Sinh và Phục Sinh",
            "Lễ Chúa Thánh Thần, Lễ các Thánh Tử Đạo, ...",
            "Các Lễ Đức Mẹ",
            "Mùa Thường Niên"
        ],
        correct: 1
    },
    {
        question: "Màu trắng trong Phụng vụ tượng trưng cho điều gì?",
        answers: [
            "Sự thống hối và buồn bã",
            "Niềm vui, sự tinh khiết và chiến thắng (Dùng lễ kính Chúa, Đức Mẹ, ...)",
            "Sự hy sinh đổ máu",
            "Sự hy vọng và sức sống"
        ],
        correct: 1
    },
    {
        question: "Nhà Tạm (Tabernacle) trong nhà thờ dùng để làm gì?",
        answers: [
            "Cất giữ các chén thánh",
            "Lưu giữ Mình Thánh Chúa",
            "Để sách Kinh Thánh",
            "Để áo lễ của Linh mục"
        ],
        correct: 1
    },
    {
        question: "Đèn chầu (thường màu đỏ) sáng bên cạnh Nhà Tạm báo hiệu điều gì?",
        answers: [
            "Nhà thờ đang mở cửa",
            "Có Chúa Giêsu Thánh Thể đang hiện diện trong Nhà Tạm",
            "Báo hiệu giờ lễ sắp bắt đầu",
            "Để trang trí cho đẹp"
        ],
        correct: 1
    },
    {
        question: "Việc bái gối hoặc cúi sâu trước Nhà Tạm thể hiện điều gì?",
        answers: [
            "Sự tôn thờ và kính trọng Chúa Giêsu Thánh Thể",
            "Chào linh mục",
            "Thói quen văn hóa",
            "Tập thể dục"
        ],
        correct: 0
    },
    {
        question: "Nước Thánh ở cửa nhà thờ dùng để làm gì?",
        answers: [
            "Để rửa tay cho sạch",
            "Để làm dấu Thánh Giá, nhắc nhớ Bí tích Rửa Tội và thanh tẩy tâm hồn",
            "Để uống xin ơn",
            "Để làm mát"
        ],
        correct: 1
    },
    {
        question: "Thánh Giuse được Giáo hội tôn kính với tước hiệu nào?",
        answers: [
            "Đấng Cứu Thế",
            "Đấng Bảo Trợ Hội Thánh và Quan Thầy các gia đình",
            "Vua các Thiên Thần",
            "Đấng Trung Gian duy nhất"
        ],
        correct: 1
    },
    {
        question: "Mầu nhiệm Sáng (trong kinh Mân Côi) được Đức Giáo Hoàng nào thêm vào?",
        answers: [
            "Đức Phaolô VI",
            "Đức Bênêđictô XVI",
            "Đức Gioan Phaolô II",
            "Đức Phanxicô"
        ],
        correct: 2
    },
    {
        question: "Lời kinh 'Sáng danh Đức Chúa Cha, và Đức Chúa Con, và Đức Chúa Thánh Thần' là kinh gì?",
        answers: [
            "Kinh Lạy Cha",
            "Kinh Kính Mừng",
            "Kinh Sáng Danh",
            "Kinh Tin Kính"
        ],
        correct: 2
    },
    {
        question: "Ba lời khuyên Phúc Âm dành cho đời sống Thánh hiến (Tu sĩ) là gì?",
        answers: [
            "Ăn chay, Cầu nguyện, Bố thí",
            "Vâng phục, Khó nghèo, Khiết tịnh",
            "Tin, Cậy, Mến",
            "Khôn ngoan, Công bình, Tiết độ"
        ],
        correct: 1
    },
    {
        question: "Thương người có 14 mối, chia làm hai loại nào?",
        answers: [
            "Thương xác và Thương linh hồn",
            "Thương người già và Thương trẻ em",
            "Thương người nghèo và Thương người bệnh",
            "Thương người trong đạo và Thương người ngoại đạo"
        ],
        correct: 0
    },
    {
        question: "Một trong những việc 'Thương xác' là gì?",
        answers: [
            "Răn bảo kẻ có tội",
            "Cho kẻ đói ăn",
            "Cầu cho kẻ sống và kẻ chết",
            "Yên ủi kẻ âu lo"
        ],
        correct: 1
    },
    {
        question: "Một trong những việc 'Thương hồn' là gì?",
        answers: [
            "Cho khách đỗ nhà",
            "Tha kẻ dể ta (tha thứ cho người xúc phạm mình)",
            "Cho kẻ rách rưới ăn mặc",
            "Chôn xác kẻ chết"
        ],
        correct: 1
    },
    {
        question: "Tội kiêu ngạo đối nghịch với nhân đức nào?",
        answers: [
            "Nhân đức Khiết tịnh",
            "Nhân đức Khiêm nhường",
            "Nhân đức Bố thí",
            "Nhân đức Nhẫn nại"
        ],
        correct: 1
    },
    {
        question: "Thánh lễ Chúa Nhật có bắt buộc đối với người Công giáo không?",
        answers: [
            "Không bắt buộc, đi thì tốt",
            "Chỉ bắt buộc đối với người già",
            "Là luật buộc nghiêm ngặt, nếu bỏ không có lý do chính đáng là phạm tội trọng",
            "Chỉ bắt buộc vào các dịp lễ lớn"
        ],
        correct: 2
    },
    {
        question: "Xưng tội nên xưng như thế nào?",
        answers: [
            "Xưng tội của người khác",
            "Xưng các việc tốt đã làm",
            "Xưng tội rõ ràng, số lượng và các hoàn cảnh làm tội nặng thêm",
            "Nói vòng vo để linh mục không hiểu"
        ],
        correct: 2
    },
    {
        question: "Ấn tín Tòa Giải Tội là gì?",
        answers: [
            "Linh mục có quyền kể tội của hối nhân cho cảnh sát",
            "Linh mục buộc phải giữ kín tuyệt đối mọi điều nghe được trong tòa giải tội",
            "Linh mục có thể kể cho người nhà hối nhân biết",
            "Linh mục ghi chép lại tội để nhớ"
        ],
        correct: 1
    },
    {
        question: "Khi nào được phép rước lễ hai lần trong một ngày?",
        answers: [
            "Bất cứ lúc nào muốn",
            "Chỉ khi tham dự trọn vẹn Thánh lễ thứ hai",
            "Không bao giờ được phép",
            "Chỉ trong ngày lễ Giáng Sinh"
        ],
        correct: 1
    },
    {
        question: "Đâu là kinh tin kính được đọc trong Thánh lễ?",
        answers: [
            "Kinh Tin Kính các Tông Đồ hoặc Kinh Tin Kính Nixêa Công-tan-ti-nô",
            "Kinh Lạy Nữ Vương",
            "Kinh Cám Ơn",
            "Kinh Vực Sâu"
        ],
        correct: 0
    },
    {
        question: "Chữ 'Amen' cuối các lời kinh có nghĩa là gì?",
        answers: [
            "Kết thúc rồi",
            "Xin Chúa tha tội",
            "Thật như vậy / Tôi tin là như vậy",
            "Cầu mong may mắn"
        ],
        correct: 2
    },
    {
        question: "Giáo lý Hội Thánh Công giáo được chia làm mấy phần chính?",
        answers: [
            "2 phần: Cựu Ước và Tân Ước",
            "3 phần: Tin, Cậy, Mến",
            "4 phần: Tuyên xưng đức tin, Cử hành mầu nhiệm Kitô giáo, Đời sống trong Đức Kitô, Kinh nguyện Kitô giáo",
            "5 phần: Năm cuốn sách của Môsê"
        ],
        correct: 2
    },
    {
        question: "Việc 'Lần hạt Mân Côi' có nguồn gốc từ việc gì?",
        answers: [
            "Từ truyền thống đọc 150 Thánh Vịnh; người bình dân thay thế bằng chuỗi kinh (đặc biệt là Kính Mừng)",
            "Đọc 150 kinh Lạy Cha",
            "Đọc 150 lời nguyện tự phát",
            "Đọc sách Khải Huyền"
        ],
        correct: 0
    },
    {
        question: "Công đồng chung (đại kết) (ecumenical council) gần đây nhất là công đồng nào?",
        answers: [
            "Công đồng Trentô",
            "Công đồng Vatican I",
            "Công đồng Vatican II (1962-1965)",
            "Công đồng Nixêa"
        ],
        correct: 2
    },
    {
        question: "Ai là người sáng lập Dòng Tên (Dòng Chúa Giêsu)?",
        answers: [
            "Thánh Phanxicô Assisi",
            "Thánh Đa Minh",
            "Thánh Inhaxiô Loyola",
            "Thánh Biển Đức"
        ],
        correct: 2
    },
    {
        question: "Thánh Tử Đạo Việt Nam Anrê Dũng Lạc là ai?",
        answers: [
            "Một vị Giám mục",
            "Một vị Linh mục",
            "Một người lính",
            "Một quan lại"
        ],
        correct: 1
    },
    {
        question: "Ngày 117 Thánh Tử Đạo Việt Nam được mừng kính vào tháng nào?",
        answers: [
            "Tháng 5",
            "Tháng 6",
            "Tháng 11",
            "Tháng 12"
        ],
        correct: 2
    },
    {
        question: "Thánh Monica là mẹ của vị thánh nổi tiếng nào?",
        answers: [
            "Thánh Tôma Aquinô",
            "Thánh Augustinô",
            "Thánh Phanxicô Xaviê",
            "Thánh Giêrônimô"
        ],
        correct: 1
    },
    {
        question: "Biểu tượng của Chúa Thánh Thần thường thấy là gì?",
        answers: [
            "Con chiên",
            "Chim bồ câu, Lửa, Gió",
            "Cây nho",
            "Con cá"
        ],
        correct: 1
    },
    {
        question: "Câu 'Lời Chúa là ngọn đèn soi cho con bước' trích từ đâu?",
        answers: [
            "Sách Sáng Thế",
            "Sách Thánh Vịnh (Tv 119)",
            "Tin Mừng Mát-thêu",
            "Sách Khải Huyền"
        ],
        correct: 1
    },
    {
        question: "Chúa Giêsu dạy ta phải tha thứ cho anh em bao nhiêu lần?",
        answers: [
            "7 lần",
            "14 lần",
            "70 lần 7 (nghĩa là tha thứ luôn luôn)",
            "3 lần là đủ"
        ],
        correct: 2
    },
    {
        question: "Sống đạo là gì?",
        answers: [
            "Chỉ là đi lễ và đọc kinh",
            "Là đem Lời Chúa thực hành vào đời sống hằng ngày để mến Chúa yêu người",
            "Là tranh luận về tôn giáo",
            "Là xa lánh thế gian hoàn toàn"
        ],
        correct: 1
    }
];

/** Kho bộ đề: gộp tất cả câu hỏi đã soạn để trích đề ngẫu nhiên */
const QUESTION_BANK = [
    ...CAU_HOI_GIAO_LY,
    ...Trac_Nghiem_Giao_Ly_So_Cap,
    ...Trac_Nghiem_Giao_Ly_So_Cap_2
];

/**
 * Lấy ngẫu nhiên n câu từ kho (không trùng, thứ tự xáo trộn).
 * @param {Array} bank - Mảng câu hỏi
 * @param {number} count - Số câu cần lấy
 * @returns {Array} Mảng câu hỏi (clone để không ảnh hưởng kho)
 */
function pickRandomQuestions(bank, count) {
    if (bank.length === 0) return [];
    const n = Math.min(count, bank.length);
    const arr = bank.map(q => ({ ...q, answers: [...(q.answers || [])] }));
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, n);
}

export const QuizModel = {
    // Danh sách đề thi (mỗi đề có id, name, description, questions)
    /** Thời gian mặc định mỗi đề (giây). 5 phút = 300. Có thể ghi đè theo từng đề bằng timeLimit. */
    DEFAULT_TIME_LIMIT_SECONDS: 300,

    exams: [
        {
            id: 'de1',
            name: 'Đề 1 - Giáo lý tổng hợp',
            description: '15 câu về Thiên Chúa, Chúa Thánh Thần, Cầu nguyện & Đức tin',
            timeLimit: 300,
            questions: [...CAU_HOI_GIAO_LY]
        },
        {
            id: 'de2',
            name: 'Đề 2 - Trắc Nghiệm Giáo Lý Sơ Cấp',
            description: '50 câu ôn tập nhanh',
            timeLimit: 720,
            questions: Trac_Nghiem_Giao_Ly_So_Cap
        },
{
            id: 'de3',
            name: 'Đề 3 - Trắc Nghiệm Giáo Lý Sơ Cấp 2',
            description: '5 câu ôn tập nhanh',
            timeLimit: 720,
            questions: Trac_Nghiem_Giao_Ly_So_Cap_2
        }
,
{
            id: 'de4',
            name: 'Đề 4 - Ôn tập nhanh',
            description: '5 câu ôn tập nhanh',
            timeLimit: 120,
            questions: CAU_HOI_GIAO_LY.slice(0, 5)
        },
        {
            id: 'random10',
            name: '🎲 Đề ngẫu nhiên 10 câu',
            description: '10 câu trích ngẫu nhiên từ kho đề',
            type: 'random',
            count: 10,
            timeLimit: 300
        },
        {
            id: 'random15',
            name: '🎲 Đề ngẫu nhiên 15 câu',
            description: '15 câu trích ngẫu nhiên từ kho đề',
            type: 'random',
            count: 15,
            timeLimit: 420
        },
        {
            id: 'random20',
            name: '🎲 Đề ngẫu nhiên 20 câu',
            description: '20 câu trích ngẫu nhiên từ kho đề',
            type: 'random',
            count: 20,
            timeLimit: 600
        }
    ],

    // Câu hỏi của đề đang chơi (gán khi gọi loadExam)
    questions: [],

    // Trạng thái quiz
    state: {
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswerIndex: null,
        timeLimitSeconds: 300,
        remainingSeconds: 300
    },

    // Reset state khi bắt đầu quiz mới (giữ timeLimitSeconds, đặt lại remainingSeconds)
    reset() {
        this.state.currentQuestionIndex = 0;
        this.state.score = 0;
        this.state.selectedAnswerIndex = null;
        this.state.remainingSeconds = this.state.timeLimitSeconds;
    },

    /** Danh sách đề thi (id, name, description, questionCount, timeLimit, timeLabel) để hiển thị trên trang chủ */
    getExams() {
        return this.exams.map(e => {
            const sec = e.timeLimit ?? this.DEFAULT_TIME_LIMIT_SECONDS;
            const questionCount = e.type === 'random' ? (e.count || 10) : (e.questions?.length ?? 0);
            return {
                id: e.id,
                name: e.name,
                description: e.description,
                questionCount,
                timeLimit: sec,
                timeLabel: this.formatTimeLabel(sec)
            };
        });
    },

    /** Chuỗi hiển thị thời gian (ví dụ: "5 phút", "2 phút", "90 giây") */
    formatTimeLabel(seconds) {
        if (seconds >= 60) {
            const phut = Math.floor(seconds / 60);
            return phut === 1 ? '1 phút' : `${phut} phút`;
        }
        return `${seconds} giây`;
    },

    /** Chọn đề thi: nạp câu hỏi và thời gian của đề. Trả về true nếu thành công. */
    loadExam(examId) {
        const exam = this.exams.find(e => e.id === examId);
        if (!exam) return false;
        if (exam.type === 'random') {
            const count = exam.count || 10;
            this.questions = pickRandomQuestions(QUESTION_BANK, count);
        } else {
            this.questions = exam.questions || [];
        }
        this.state.timeLimitSeconds = exam.timeLimit ?? this.DEFAULT_TIME_LIMIT_SECONDS;
        this.state.remainingSeconds = this.state.timeLimitSeconds;
        return true;
    },

    getTimeLimitSeconds() {
        return this.state.timeLimitSeconds;
    },

    getRemainingSeconds() {
        return this.state.remainingSeconds;
    },

    /** Giảm 1 giây. Trả về số giây còn lại (có thể âm nếu đã hết giờ). */
    decrementTime() {
        this.state.remainingSeconds--;
        return this.state.remainingSeconds;
    },

    isTimeUp() {
        return this.state.remainingSeconds <= 0;
    },

    getCurrentQuestion() {
        return this.questions[this.state.currentQuestionIndex] || null;
    },

    getQuestionCount() {
        return this.questions.length;
    },

    setSelectedAnswer(index) {
        this.state.selectedAnswerIndex = index;
    },

    getSelectedAnswer() {
        return this.state.selectedAnswerIndex;
    },

    isCorrectAnswer(index) {
        const q = this.getCurrentQuestion();
        return q && q.correct === index;
    },

    addScore(points = 10) {
        this.state.score += points;
    },

    getScore() {
        return this.state.score;
    },

    getMaxScore() {
        return this.questions.length * 10;
    },

    nextQuestion() {
        this.state.currentQuestionIndex++;
        this.state.selectedAnswerIndex = null;
    },

    hasMoreQuestions() {
        return this.state.currentQuestionIndex < this.questions.length;
    },

    getResultInfo() {
        const maxScore = this.getMaxScore();
        const percentage = maxScore > 0 ? (this.state.score / maxScore) * 100 : 0;
        const timeUp = this.state.remainingSeconds <= 0;
        let emoji, message;
        if (timeUp && this.state.score === 0) {
            emoji = "⏱️ 💪 📖";
            message = "Hết giờ! Hãy thử lại và cố gắng trả lời nhanh hơn nhé!";
        } else if (timeUp) {
            emoji = "⏱️ 🎯";
            message = "Hết giờ! Em đã làm được " + this.state.score + " điểm. Thử lại để cải thiện nhé!";
        } else if (percentage >= 90) {
            emoji = "🏆 🌟 ✨";
            message = "Xuất sắc! Em thật tuyệt vời!";
        } else if (percentage >= 70) {
            emoji = "🎉 👏 😊";
            message = "Giỏi lắm! Em làm rất tốt!";
        } else if (percentage >= 50) {
            emoji = "💪 📚 ⭐";
            message = "Khá đấy! Cố gắng thêm nhé!";
        } else {
            emoji = "🌱 💖 🙏";
            message = "Đừng nản chí! Hãy thử lại nhé!";
        }
        return { score: this.state.score, emoji, message, timeUp };
    }
};
