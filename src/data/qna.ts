import { QnaItem } from '../types/game';

export const QNA_QUESTIONS: QnaItem[] = [
  // =========================================================================
  // BƯỚC 1: XÁC ĐỊNH & ĐÓNG KHUNG VẤN ĐỀ (PROBLEM DEFINITION & SCOPING)
  // =========================================================================
  {
    id: 'ssa_q01',
    step: 'Bước 1: Xác Định Vấn Đề - Phình To Phạm Vi (Scope Creep)',
    scenario: 'Nhóm sinh viên nhận đề tài môn học: "Xây dựng ứng dụng khảo sát 5 câu hỏi để đo lường mức độ hài lòng tại căng tin trong 2 tuần". Sau 3 ngày họp, nhóm quyết định tích hợp thêm hệ thống đặt món online, ví điện tử và mạng xã hội kết nối sinh viên.',
    question: 'Hành vi trên vi phạm nghiêm trọng nguyên tắc nào trong Bước 1 của quy trình giải quyết vấn đề?',
    options: [
      {
        id: 'a',
        text: 'Bị rơi vào bẫy Scope Creep (Phình to phạm vi), làm loãng mục tiêu cốt lõi và chắc chắn vỡ tiến độ dự án.',
        isCorrect: true,
        explanation: 'Chính xác! Bước 1 đòi hỏi phải khoanh vùng ranh giới vấn đề (Boundaries) và xác định Sản phẩm khả dụng tối thiểu (MVP) trước khi nghĩ đến các tính năng phụ.'
      },
      {
        id: 'b',
        text: 'Nhóm đang thể hiện tư duy sáng tạo đột phá cần được khuyến khích tối đa mà không cần giới hạn.',
        isCorrect: false,
        explanation: 'Sai lầm. Sáng tạo không có kỷ luật phạm vi và nguồn lực chỉ dẫn đến thất bại trong triển khai.'
      },
      {
        id: 'c',
        text: 'Vấn đề thực sự chỉ là thiếu lập trình viên giỏi để hoàn thành cả 4 tính năng trong 2 tuần.',
        isCorrect: false,
        explanation: 'Sai lầm. Đây là ngụy biện đổ lỗi cho nguồn lực thay vì nhìn nhận lỗi sai căn bản trong khâu định nghĩa phạm vi.'
      }
    ]
  },
  {
    id: 'ssa_q02',
    step: 'Bước 1: Đóng Khung Vấn Đề - Triệu Chứng vs Bản Chất',
    scenario: 'Một công ty khởi nghiệp ghi nhận tỷ lệ khách hàng rời bỏ ứng dụng (Churn Rate) tăng 35% trong tháng qua. Giám đốc yêu cầu phòng Marketing tung ngay voucher giảm giá 50% để giữ chân người dùng.',
    question: 'Tại sao quyết định tung voucher ngay lúc này lại là một sai lầm phổ biến trong giải quyết vấn đề?',
    options: [
      {
        id: 'a',
        text: 'Vì chiết khấu 50% vẫn chưa đủ hấp dẫn để kích thích người dùng quay lại.',
        isCorrect: false,
        explanation: 'Sai lầm. Tăng khuyến mãi mù quáng chỉ làm cạn kiệt ngân sách mà không chạm tới vấn đề thật.'
      },
      {
        id: 'b',
        text: 'Vì đang nhầm lẫn giữa "Triệu chứng" (khách bỏ đi) và "Nguyên nhân cốt lõi" (ứng dụng lỗi, trải nghiệm tệ hoặc đối thủ vượt trội).',
        isCorrect: true,
        explanation: 'Xuất sắc! Khách rời bỏ chỉ là triệu chứng bề mặt. Nếu ứng dụng liên tục giật lag hoặc mất dữ liệu, voucher giảm giá chỉ khiến khách nhận ưu đãi rồi tiếp tục rời đi.'
      },
      {
        id: 'c',
        text: 'Vì nên sa thải toàn bộ đội ngũ chăm sóc khách hàng trước khi tính đến chuyện giảm giá.',
        isCorrect: false,
        explanation: 'Sai lầm. Đây là phản ứng cảm tính đổ lỗi cá nhân mà không dựa trên dữ liệu chẩn đoán hệ thống.'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 2: PHÂN TÍCH NGUYÊN NHÂN GỐC RỄ (ROOT CAUSE ANALYSIS & 5 WHYS)
  // =========================================================================
  {
    id: 'ssa_q03',
    step: 'Bước 2: Phân Tích Nguyên Nhân - Phương Pháp 5 Whys',
    scenario: 'Tại một quán cà phê sinh viên, nhân viên liên tục trượt ngã làm vỡ đồ uống vào giờ cao điểm sáng. Quản lý lập biên bản phạt nhân viên vì "bất cẩn và đi đứng vội vàng".',
    question: 'Theo kỹ thuật 5 Whys trong SSA101, nhận định nào chỉ ra sai lầm của người quản lý?',
    options: [
      {
        id: 'a',
        text: 'Quản lý dừng lại quá sớm ở hành vi con người mà không đào sâu vào yếu tố môi trường (sàn gạch trơn, thiếu thảm chống trượt) và quy trình layout quầy bar.',
        isCorrect: true,
        explanation: 'Rất chuẩn! 5 Whys giúp ta vượt qua phản xạ đổ lỗi cho cá nhân để tìm ra lỗi hệ thống (Systemic Failure).'
      },
      {
        id: 'b',
        text: 'Mức tiền phạt quá nhẹ, cần phạt gấp đôi để nhân viên tập trung làm việc hơn.',
        isCorrect: false,
        explanation: 'Sai lầm. Trừng phạt nặng hơn chỉ làm tăng tỷ lệ nhân viên nghỉ việc chứ không ngăn được nước rò rỉ làm trơn sàn.'
      },
      {
        id: 'c',
        text: 'Nên yêu cầu nhân viên chỉ đi bộ thật chậm chạp dù khách đang xếp hàng dài.',
        isCorrect: false,
        explanation: 'Sai lầm. Giải pháp này gây tắc nghẽn quầy thanh toán và làm giảm sút doanh thu nghiêm trọng.'
      }
    ]
  },
  {
    id: 'ssa_q04',
    step: 'Bước 2: Biểu Đồ Xương Cá Ishikawa - Phân Loại 4M',
    scenario: 'Dây chuyền sản xuất bánh ngọt của một xưởng thực phẩm bị biến dạng hình thức hàng loạt. Nhóm phụ trách lập biểu đồ Ishikawa (Fishbone Diagram) để tìm nguyên nhân.',
    question: 'Theo mô hình phân loại nguyên nhân 4M (Man - Machine - Method - Material), việc "Nhiệt độ lò nướng dao động thất thường do cảm biến cũ" thuộc nhánh nào?',
    options: [
      {
        id: 'a',
        text: 'Nhánh Material (Nguyên vật liệu đầu vào)',
        isCorrect: false,
        explanation: 'Sai. Bột, đường, bơ mới thuộc nhánh Nguyên vật liệu.'
      },
      {
        id: 'b',
        text: 'Nhánh Method (Phương pháp / Công thức vận hành)',
        isCorrect: false,
        explanation: 'Sai. Quy trình cài đặt thời gian nướng mới thuộc Method.'
      },
      {
        id: 'c',
        text: 'Nhánh Machine (Thiết bị, máy móc và công cụ vận hành)',
        isCorrect: true,
        explanation: 'Chính xác! Lò nướng và cảm biến nhiệt độ là trang thiết bị kỹ thuật thuộc nhóm Machine.'
      }
    ]
  },
  {
    id: 'ssa_q05',
    step: 'Bước 2: Nguyên Lý Pareto 80/20 Trong Ưu Tiên Xử Lý',
    scenario: 'Bộ phận hỗ trợ kỹ thuật tổng hợp 500 khiếu nại của khách hàng và phân thành 6 nhóm lỗi khác nhau. Ngân sách và thời gian chỉ đủ để khắc phục triệt để 1 hoặc 2 lỗi trong tuần này.',
    question: 'Ứng dụng nguyên lý Pareto (80/20), nhóm nên hành động như thế nào?',
    options: [
      {
        id: 'a',
        text: 'Chia đều thời gian và nguồn lực để sửa mỗi nhóm lỗi một chút cho công bằng.',
        isCorrect: false,
        explanation: 'Sai lầm. Dàn trải nguồn lực khiến không có lỗi nào được giải quyết triệt để.'
      },
      {
        id: 'b',
        text: 'Tập trung toàn lực xử lý 20% nhóm nguyên nhân cốt lõi đang chiếm tới 80% tổng lượng khiếu nại của khách.',
        isCorrect: true,
        explanation: 'Chính xác! Nguyên lý Pareto giúp tối đa hóa tác động với nguồn lực hữu hạn (Vital Few vs. Trivial Many).'
      },
      {
        id: 'c',
        text: 'Ưu tiên sửa lỗi dễ nhất và tốn ít công sức nhất trước bất kể lỗi đó có ít khách phàn nàn.',
        isCorrect: false,
        explanation: 'Sai lầm. Sửa lỗi vụn vặt không giúp giải quyết được bức xúc của đại đa số người dùng.'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 3: ĐỘNG NÃO & TƯ DUY SÁNG TẠO (BRAINSTORMING & SCAMPER)
  // =========================================================================
  {
    id: 'ssa_q06',
    step: 'Bước 3: Động Não - Nguyên Tắc "Tạm Hoãn Phán Xét"',
    scenario: 'Trong buổi Brainstorming tìm ý tưởng marketing mới cho CLB, bạn Nam vừa đề xuất: "Hay là mình mời một chú hề phát bóng bay trước cổng trường?". Trưởng nhóm lập tức ngắt lời: "Vớ vẩn! CLB học thuật ai lại làm thế, ý tưởng tiếp theo đi!".',
    question: 'Hành vi của trưởng nhóm vi phạm quy tắc cốt tử nào của kỹ thuật Động não (Brainstorming)?',
    options: [
      {
        id: 'a',
        text: 'Quy tắc Tạm hoãn phán xét (Defer Judgement) và Khuyến khích số lượng (Go for Quantity).',
        isCorrect: true,
        explanation: 'Rất chính xác! Chỉ trích sớm sẽ bóp nghẹt sự sáng tạo, khiến các thành viên sợ hãi và không dám chia sẻ thêm bất kỳ ý tưởng táo bạo nào.'
      },
      {
        id: 'b',
        text: 'Quy tắc Không được phản bác người có điểm trung bình học tập cao hơn.',
        isCorrect: false,
        explanation: 'Sai. Brainstorming bình đẳng về ý tưởng, không căn cứ vào điểm số cá nhân.'
      },
      {
        id: 'c',
        text: 'Trưởng nhóm hoàn toàn đúng vì cần loại bỏ ngay các ý tưởng phi thực tế để tiết kiệm thời gian.',
        isCorrect: false,
        explanation: 'Sai lầm nghiêm trọng. Giai đoạn sinh ý tưởng (Divergent Thinking) tách biệt hoàn toàn với giai đoạn sàng lọc (Convergent Thinking).'
      }
    ]
  },
  {
    id: 'ssa_q07',
    step: 'Bước 3: Kỹ Thuật SCAMPER - Đảo Ngược (Reverse/Rearrange)',
    scenario: 'Bãi giữ xe trường học bị tắc nghẽn nghiêm trọng vào mỗi sáng do quy trình: Dừng xe -> Quẹt thẻ -> Chờ mở rào chắn -> Bảo vệ thu tiền mặt.',
    question: 'Áp dụng chữ R (Reverse - Đảo ngược) trong mô hình SCAMPER, giải pháp nào dưới đây mang tính đột phá?',
    options: [
      {
        id: 'a',
        text: 'Tăng thêm 2 nhân viên bảo vệ để đứng đếm tiền nhanh hơn.',
        isCorrect: false,
        explanation: 'Đây là giải pháp mở rộng tuyến tính thông thường, không áp dụng tư duy đảo ngược.'
      },
      {
        id: 'b',
        text: 'Đảo ngược quy trình: Cho xe vào cổng tự do không cần dừng (quét biển số tự động khi đang chạy), việc thanh toán tích hợp vào học phí hoặc qua app sau.',
        isCorrect: true,
        explanation: 'Tuyệt vời! Đảo ngược thứ tự kiểm tra/thanh toán giúp dòng phương tiện lưu thông liên tục không bị nghẽn cổ chai.'
      },
      {
        id: 'c',
        text: 'Yêu cầu sinh viên phải đến trường trước giờ học 1 tiếng để tránh tắc đường.',
        isCorrect: false,
        explanation: 'Sai. Đây là đẩy gánh nặng sang người dùng thay vì cải tiến quy trình.'
      }
    ]
  },
  {
    id: 'ssa_q08',
    step: 'Bước 3: Vượt Qua Bẫy "Cố Định Chức Năng" (Functional Fixedness)',
    scenario: 'Trong sự cố tàu vũ trụ Apollo 13, phi hành đoàn phải lọc khí CO2 nhưng ống lọc vuông của khoang đổ bộ lại không vừa với ổ cắm tròn của khoang chỉ huy. Họ chỉ có băng dính xám, bìa carton và túi ni lông.',
    question: 'Khái niệm "Cố định chức năng" (Functional Fixedness) mô tả rào cản tâm lý nào?',
    options: [
      {
        id: 'a',
        text: 'Xu hướng chỉ nhìn thấy một đồ vật theo đúng chức năng truyền thống vốn có của nó (ví dụ: nghĩ băng dính chỉ để dán giấy thay vì làm kín ống khí).',
        isCorrect: true,
        explanation: 'Chuẩn xác! Vượt qua cố định chức năng là chìa khóa để tái sử dụng nguồn lực có sẵn trong nghịch cảnh.'
      },
      {
        id: 'b',
        text: 'Sự kiên định tuân thủ tuyệt đối quy trình vận hành tiêu chuẩn trong sách hướng dẫn.',
        isCorrect: false,
        explanation: 'Sai. Đây là tính kỷ luật quy trình, không phải định nghĩa của cố định chức năng.'
      },
      {
        id: 'c',
        text: 'Việc từ chối hợp tác với các đồng nghiệp khác chuyên môn.',
        isCorrect: false,
        explanation: 'Sai. Đó là hiện tượng Silo Mentality (Tư duy cục bộ).'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 4: ĐÁNH GIÁ & LỰA CHỌN GIẢI PHÁP (DECISION MATRIX & CRITICAL THINKING)
  // =========================================================================
  {
    id: 'ssa_q09',
    step: 'Bước 4: Ma Trận Quyết Định Có Trọng Số (Weighted Decision Matrix)',
    scenario: 'Nhóm bạn đang chọn 1 trong 3 đề tài nghiên cứu khoa học. Các thành viên tranh cãi nảy lửa vì mỗi người thích một chủ đề khác nhau theo cảm tính cá nhân.',
    question: 'Phương pháp khoa học nhất để nhóm đưa ra quyết định đồng thuận và khách quan là gì?',
    options: [
      {
        id: 'a',
        text: 'Lập Ma trận quyết định có trọng số: Thống nhất các tiêu chí (Tính khả thi, Tính mới, Chi phí, Dữ liệu có sẵn) và chấm điểm định lượng.',
        isCorrect: true,
        explanation: 'Chính xác! Ma trận quyết định biến tranh luận cảm tính thành đánh giá đa tiêu chí minh bạch và có căn cứ.'
      },
      {
        id: 'b',
        text: 'Bốc thăm ngẫu nhiên để không ai cảm thấy bị mất mặt.',
        isCorrect: false,
        explanation: 'Sai. Phụ thuộc vào may rủi là từ bỏ trách nhiệm tư duy phản biện.'
      },
      {
        id: 'c',
        text: 'Chọn đề tài mà bạn nhóm trưởng yêu thích vì nhóm trưởng chịu trách nhiệm điểm số cao nhất.',
        isCorrect: false,
        explanation: 'Sai. Đây là bẫy HiPPO (Highest Paid Person\'s Opinion) - dựa vào quyền uy thay vì dữ liệu.'
      }
    ]
  },
  {
    id: 'ssa_q10',
    step: 'Tư Duy Phản Biện: Bẫy Chi Phí Chìm (Sunk Cost Fallacy)',
    scenario: 'Một dự án phần mềm đã tiêu tốn 200 triệu VNĐ và 6 tháng phát triển. Tuy nhiên, công nghệ cốt lõi của dự án vừa bị một thư viện mã nguồn mở miễn phí vượt mặt hoàn toàn về tốc độ lẫn tính năng.',
    question: 'Nhận định nào dưới đây thể hiện tư duy của người phản biện sáng suốt, KHÔNG bị bẫy chi phí chìm?',
    options: [
      {
        id: 'a',
        text: '"Đã lỡ bỏ ra 200 triệu rồi, bỏ bây giờ thì mất trắng! Phải làm tiếp cho xong để thu hồi vốn."',
        isCorrect: false,
        explanation: 'Sai lầm. Đây chính là biểu hiện điển hình của bẫy tâm lý Chi phí chìm (Sunk Cost Fallacy).'
      },
      {
        id: 'b',
        text: '"200 triệu đã qua là khoản không thể thu hồi. Quyết định tiếp tục hay dừng lại chỉ được căn cứ trên chi phí, rủi ro và giá trị tương lai."',
        isCorrect: true,
        explanation: 'Rất xuất sắc! Chi phí chìm đã mất vĩnh viễn trong quá khứ. Đổ thêm tiền vào một giải pháp lỗi thời chỉ làm tăng gấp đôi khoản lỗ.'
      },
      {
        id: 'c',
        text: '"Tạm dừng dự án 1 năm rồi chờ xem thư viện mã nguồn mở kia có bị phá sản hay không."',
        isCorrect: false,
        explanation: 'Sai. Trì hoãn chỉ làm lãng phí cơ hội nắm bắt công nghệ mới.'
      }
    ]
  },
  {
    id: 'ssa_q11',
    step: 'Tư Duy Phản Biện: Ngụy Biện Tương Quan vs Nhân Quả',
    scenario: 'Một khảo sát nội bộ chỉ ra rằng: "Những nhân viên uống trên 4 tách cà phê mỗi ngày có số dòng code viết ra nhiều hơn 30%, nhưng hệ thống của họ cũng gặp nhiều lỗi hơn 40% so với người khác". Trưởng phòng kết luận: "Cà phê gây hại cho khả năng tư duy logic của lập trình viên, cần cấm cà phê".',
    question: 'Lỗ hổng logic trong kết luận của trưởng phòng là gì?',
    options: [
      {
        id: 'a',
        text: 'Đánh đồng Mối tương quan (Correlation) thành Quan hệ nhân quả (Causation); cả hai có thể cùng bắt nguồn từ biến ẩn thứ ba là "Áp lực deadline và làm việc kiệt sức".',
        isCorrect: true,
        explanation: 'Tuyệt vời! Nhân viên chịu áp lực lớn vừa phải thức khuya uống nhiều cà phê, vừa dễ mất tập trung dẫn đến sinh bug code.'
      },
      {
        id: 'b',
        text: 'Cỡ mẫu khảo sát chưa đạt 1 triệu người nên dữ liệu hoàn toàn vô giá trị.',
        isCorrect: false,
        explanation: 'Sai. Cỡ mẫu nội bộ có giá trị tham khảo, lỗi nằm ở suy luận nhân quả sai lầm.'
      },
      {
        id: 'c',
        text: 'Chất caffeine đã được chứng minh là luôn làm tăng chỉ số IQ của con người vô điều kiện.',
        isCorrect: false,
        explanation: 'Sai. Đây là phát biểu ngụy khoa học thiếu căn cứ.'
      }
    ]
  },
  {
    id: 'ssa_q12',
    step: 'Tư Duy Phản Biện: Bẫy Thiên Kiến Xác Nhận (Confirmation Bias)',
    scenario: 'Nhóm nghiên cứu tin rằng gen Z chỉ thích học qua video ngắn dưới 60 giây. Khi phỏng vấn người dùng, nhóm bỏ qua 8 câu trả lời của các bạn thích đọc giáo trình chi tiết và chỉ ghi chú lại 2 câu trả lời của các bạn thích xem TikTok.',
    question: 'Hiện tượng tâm lý nguy hiểm nào đang diễn ra trong trường hợp này?',
    options: [
      {
        id: 'a',
        text: 'Hiệu ứng Dunning-Kruger.',
        isCorrect: false,
        explanation: 'Sai. Dunning-Kruger là sự tự tin thái quá của người thiếu hiểu biết.'
      },
      {
        id: 'b',
        text: 'Thiên kiến xác nhận (Confirmation Bias): Chỉ tìm kiếm và ghi nhận thông tin củng cố niềm tin có sẵn, phớt lờ bằng chứng phản bác.',
        isCorrect: true,
        explanation: 'Chính xác! Tư duy phản biện đòi hỏi phải chủ động đi tìm các bằng chứng phản bác (Disconfirming Evidence) để thử thách giả định của mình.'
      },
      {
        id: 'c',
        text: 'Ngụy biện Tấn công cá nhân (Ad Hominem).',
        isCorrect: false,
        explanation: 'Sai. Ở đây không có hành vi công kích xúc phạm người khác.'
      }
    ]
  },
  {
    id: 'ssa_q13',
    step: 'Tư Duy Phản Biện: Ngụy Biện Nhị Nguyên Giả Định (False Dilemma)',
    scenario: 'Trong cuộc họp thảo luận về doanh số, một thành viên phát biểu: "Hoặc là chúng ta phải sa thải ngay 30% nhân sự để cắt giảm chi phí, hoặc là công ty sẽ phá sản trong tháng tới!".',
    question: 'Lập luận trên mắc lỗi ngụy biện nào?',
    options: [
      {
        id: 'a',
        text: 'Ngụy biện Trượt dốc không phanh (Slippery Slope).',
        isCorrect: false,
        explanation: 'Sai. Đây không phải chuỗi hệ quả liên đới.'
      },
      {
        id: 'b',
        text: 'Ngụy biện Nhị nguyên giả định (False Dilemma / Black-or-White): Cố tình ép người nghe vào 2 lựa chọn cực đoan trong khi còn nhiều giải pháp dung hòa khác.',
        isCorrect: true,
        explanation: 'Chính xác! Thực tế công ty có thể tái cơ cấu quy trình, đàm phán giảm chi phí thuê mặt bằng, tìm thị trường ngách mới thay vì chỉ có 2 thái cực.'
      },
      {
        id: 'c',
        text: 'Lập luận hoàn toàn hợp lý vì quản trị kinh doanh chỉ có lãi hoặc lỗ.',
        isCorrect: false,
        explanation: 'Sai. Lối tư duy trắng đen triệt tiêu khả năng tìm kiếm các phương án thích ứng sáng tạo.'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 5: LẬP KẾ HOẠCH HÀNH ĐỘNG & QUẢN TRỊ RỦI RO (BACKUP PLANS)
  // =========================================================================
  {
    id: 'ssa_q14',
    step: 'Bước 5: Kế Hoạch Dự Phòng - Điểm Kích Hoạt (Trigger Point)',
    scenario: 'Đội sự kiện lên kế hoạch tổ chức đêm nhạc ngoài trời. Nhóm chuẩn bị sẵn phương án B (thuê hội trường trong nhà). Tuy nhiên, đến sát giờ diễn khi trời đổ mưa to, nhóm mới bắt đầu gọi điện tìm người giữ chìa khóa hội trường.',
    question: 'Một Kế hoạch dự phòng (Backup Plan) chuẩn mực thiếu sót yếu tố then chốt nào trong tình huống trên?',
    options: [
      {
        id: 'a',
        text: 'Xác định "Điểm kích hoạt" (Trigger Point) và kịch bản chuyển giao rõ ràng (ví dụ: nếu lúc 15h00 trời mưa >50% thì tự động kích hoạt Plan B ngay).',
        isCorrect: true,
        explanation: 'Tuyệt vời! Kế hoạch dự phòng mà không có mốc thời gian/điều kiện kích hoạt rõ ràng sẽ biến thành sự hoảng loạn vào phút chót.'
      },
      {
        id: 'b',
        text: 'Đáng lẽ không nên chuẩn bị Plan B để toàn đội tập trung cầu nguyện cho trời nắng.',
        isCorrect: false,
        explanation: 'Sai lầm. Dựa vào may rủi là cấm kỵ trong quản trị rủi ro.'
      },
      {
        id: 'c',
        text: 'Kế hoạch dự phòng chỉ cần có ý tưởng trong đầu, không cần quy trình triển khai chi tiết.',
        isCorrect: false,
        explanation: 'Sai. Một Plan B khả thi phải sẵn sàng nguồn lực thực thi ngay lập tức.'
      }
    ]
  },
  {
    id: 'ssa_q15',
    step: 'Bước 5: Nguyên Tắc MECE Trong Phân Rã Kế Hoạch',
    scenario: 'Khi lập kế hoạch phân công công việc cho tuần lễ văn hóa trường, trưởng ban chia các nhóm nhiệm vụ thành: 1. Nhóm Truyền thông, 2. Nhóm Hậu cần, 3. Nhóm Thiết kế banner, 4. Nhóm Khách mời.',
    question: 'Theo nguyên tắc MECE (Mutually Exclusive, Collectively Exhaustive), cách phân chia trên gặp vấn đề gì?',
    options: [
      {
        id: 'a',
        text: 'Không có vấn đề gì, chia càng nhiều nhóm càng dễ quản lý.',
        isCorrect: false,
        explanation: 'Sai. Các nhóm bị chồng chéo trách nhiệm.'
      },
      {
        id: 'b',
        text: 'Bị trùng lặp (Overlapping): "Thiết kế banner" vốn là một phần công việc trực thuộc "Truyền thông", gây đùn đẩy trách nhiệm và tranh chấp quyền hạn.',
        isCorrect: true,
        explanation: 'Rất chuẩn! MECE đòi hỏi các nhóm nhiệm vụ phải tách biệt rạch ròi, không chồng lấn lên nhau nhưng tổng thể phải bao quát toàn diện.'
      },
      {
        id: 'c',
        text: 'Thiếu nhóm phụ trách việc mua đồ ăn vặt cho ban tổ chức.',
        isCorrect: false,
        explanation: 'Sai. Đồ ăn vặt đã nằm trong phạm vi Hậu cần.'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 6: TRIỂN KHAI & QUẢN TRỊ CÁC BÊN LIÊN QUAN (STAKEHOLDERS)
  // =========================================================================
  {
    id: 'ssa_q16',
    step: 'Bước 6: Quản Trị Các Bên Liên Quan (Stakeholder Mapping)',
    scenario: 'Trường đại học triển khai hệ thống điểm danh tự động bằng nhận diện khuôn mặt. Dự án bị đình trệ vì sinh viên phản đối kịch liệt vì lo ngại lộ lọt dữ liệu riêng tư.',
    question: 'Đâu là sai lầm căn bản trong khâu phân tích các bên liên quan của ban dự án?',
    options: [
      {
        id: 'a',
        text: 'Xem nhẹ đối tượng có "Mối quan tâm cao nhưng ít quyền lực chính thức" (Sinh viên), không truyền thông minh bạch và giải tỏa nỗi lo bảo mật ngay từ đầu.',
        isCorrect: true,
        explanation: 'Chính xác! Ma trận Stakeholder nhắc nhở rằng nhóm có mối quan tâm cao nếu không được lắng nghe sẽ tạo ra sức kháng cự khổng lồ làm sụp đổ dự án.'
      },
      {
        id: 'b',
        text: 'Không ra quyết định kỷ luật ngay lập tức những sinh viên lên tiếng phản đối trên mạng xã hội.',
        isCorrect: false,
        explanation: 'Sai lầm. Biện pháp trấn áp chỉ làm bùng phát khủng hoảng truyền thông trầm trọng hơn.'
      },
      {
        id: 'c',
        text: 'Đáng lẽ nên âm thầm lắp đặt camera mà không thông báo cho sinh viên biết.',
        isCorrect: false,
        explanation: 'Sai nghiêm trọng. Vi phạm đạo đức nghề nghiệp và pháp luật về bảo vệ dữ liệu cá nhân.'
      }
    ]
  },
  {
    id: 'ssa_q17',
    step: 'Bước 6: Đàm Phán Tích Hợp (Win-Win vs. Zero-Sum)',
    scenario: 'Nhóm sinh viên tranh cãi về địa điểm làm bài tập lớn: Nhóm A muốn học ở quán cà phê ồn ào để có cảm hứng, Nhóm B muốn ở thư viện yên tĩnh để tập trung.',
    question: 'Tư duy giải quyết vấn đề Win-Win (Thắng - Thắng) tiếp cận tình huống này như thế nào?',
    options: [
      {
        id: 'a',
        text: 'Biểu quyết theo đa số, bên thua cuộc phải chấp nhận làm việc trong bực bội.',
        isCorrect: false,
        explanation: 'Đây là tư duy Zero-Sum (Thắng - Thua), gây rạn nứt tinh thần đồng đội.'
      },
      {
        id: 'b',
        text: 'Chia tách thành 2 ca: 1 tiếng đầu ở quán cà phê để động não ý tưởng tự do, sau đó di chuyển sang phòng tự học thư viện để hoàn thiện bài viết.',
        isCorrect: true,
        explanation: 'Rất xuất sắc! Đàm phán tích hợp tìm kiếm giải pháp đáp ứng nhu cầu thực chất của cả hai bên thay vì thỏa hiệp cào bằng kém hiệu quả.'
      },
      {
        id: 'c',
        text: 'Hủy buổi học nhóm và ai tự làm phần người nấy.',
        isCorrect: false,
        explanation: 'Đây là tư duy Né tránh (Lose - Lose).'
      }
    ]
  },
  {
    id: 'ssa_q18',
    step: 'Tư Duy Phản Biện: Bẫy Tư Duy Tập Thể (Groupthink)',
    scenario: 'Trong cuộc họp, khi sếp đưa ra một giải pháp có lỗ hổng bảo mật rõ ràng, tất cả các thành viên đều nhận ra nhưng không ai dám lên tiếng vì sợ bị coi là "kẻ phá rối" và muốn giữ hòa khí.',
    question: 'Hiện tượng tâm lý xã hội nguy hiểm nào đang làm tê liệt năng lực phản biện của tập thể này?',
    options: [
      {
        id: 'a',
        text: 'Hiệu ứng Bàng quan (Bystander Effect).',
        isCorrect: false,
        explanation: 'Sai. Hiệu ứng bàng quan thường xảy ra khi chứng kiến người bị nạn nơi công cộng.'
      },
      {
        id: 'b',
        text: 'Bẫy Tư duy tập thể (Groupthink) - Nơi áp lực đồng thuận đè bẹp sự đánh giá phản biện độc lập.',
        isCorrect: true,
        explanation: 'Chính xác! Groupthink là nguyên nhân của nhiều thảm họa kinh tế và kỹ thuật. Cần cử ra một "Người phản biện đóng vai ác" (Devil\'s Advocate) để phá vỡ bẫy này.'
      },
      {
        id: 'c',
        text: 'Sự đoàn kết và tôn trọng cấp trên tuyệt đối.',
        isCorrect: false,
        explanation: 'Sai lầm. Hòa khí giả tạo không đồng nghĩa với hiệu quả công việc thực chất.'
      }
    ]
  },

  // =========================================================================
  // BƯỚC 7: ĐÁNH GIÁ, ĐO LƯỜNG & HỌP RÚT KINH NGHIỆM (POST-MORTEM)
  // =========================================================================
  {
    id: 'ssa_q19',
    step: 'Bước 7: Đánh Giá - Họp Rút Kinh Nghiệm Không Đổ Lỗi (Blameless Post-Mortem)',
    scenario: 'Sau sự cố sập máy chủ đăng ký tín chỉ vào ngày đầu học kỳ, phòng Khảo thí tổ chức cuộc họp rút kinh nghiệm.',
    question: 'Nguyên tắc cốt lõi của một buổi "Họp rút kinh nghiệm không đổ lỗi" (Blameless Post-mortem) là gì?',
    options: [
      {
        id: 'a',
        text: 'Truy tìm cho bằng được lập trình viên nào đã đẩy code lỗi lên hệ thống để trừ lương răn đe.',
        isCorrect: false,
        explanation: 'Sai lầm. Văn hóa chỉ trích cá nhân sẽ khiến nhân viên giấu giếm lỗi trong tương lai.'
      },
      {
        id: 'b',
        text: 'Tập trung điều tra: Lỗ hổng nào trong quy trình kiểm thử và cơ chế chịu tải đã cho phép lỗi này xảy ra mà không bị phát hiện sớm.',
        isCorrect: true,
        explanation: 'Rất chuẩn mực! Coi con người là nạn nhân của một hệ thống có lỗ hổng. Sửa chữa quy trình và tự động hóa mới ngăn ngừa được lỗi tái diễn.'
      },
      {
        id: 'c',
        text: 'Đồng ý rằng sự cố sập mạng là do ông trời xui xẻo và không ai có lỗi.',
        isCorrect: false,
        explanation: 'Sai lầm. Đây là thái độ vô trách nhiệm, không tạo ra bất kỳ bài học kinh nghiệm nào.'
      }
    ]
  },
  {
    id: 'ssa_q20',
    step: 'Tư Duy Phản Biện: Ngụy Biện Tấn Công Cá Nhân (Ad Hominem)',
    scenario: 'Trong buổi tranh biện về chính sách bảo vệ môi trường, bạn A đưa ra số liệu thống kê chứng minh túi vải tote có lượng phát thải carbon lớn hơn túi nilon nếu không tái sử dụng trên 100 lần. Bạn B phản bác: "Bạn A gia đình buôn bán đồ nhựa nên nói thế là vì tư lợi cá nhân, đừng ai tin!".',
    question: 'Bạn B đã phạm phải lỗi ngụy biện nào?',
    options: [
      {
        id: 'a',
        text: 'Ngụy biện Tấn công cá nhân (Ad Hominem): Tấn công vào thân thế, động cơ hoặc xuất thân của người nói thay vì phản biện tính đúng sai của số liệu.',
        isCorrect: true,
        explanation: 'Chính xác! Lập luận logic phải được đánh giá dựa trên bằng chứng và dữ liệu, không phải dựa trên danh tính người đưa ra lập luận.'
      },
      {
        id: 'b',
        text: 'Ngụy biện Đánh tráo khái niệm (Equivocation).',
        isCorrect: false,
        explanation: 'Sai. Bạn B không dùng từ ngữ hai nghĩa.'
      },
      {
        id: 'c',
        text: 'Lập luận bạn B hoàn toàn có lý vì động cơ cá nhân quyết định 100% tính chân lý của số liệu.',
        isCorrect: false,
        explanation: 'Sai lầm. Ngay cả một kẻ gian nói "1 + 1 = 2" thì phát biểu đó vẫn đúng.'
      }
    ]
  },
  {
    id: 'ssa_q21',
    step: 'Tư Duy Phản Biện: Ngụy Biện Người Rơm (Strawman)',
    scenario: 'Thành viên X đề xuất: "Để tăng chất lượng bài thuyết trình, nhóm mình nên dành thêm 30 phút kiểm tra lại các nguồn trích dẫn". Thành viên Y đập bàn nói: "Ý bạn là chúng tôi trước giờ toàn đạo văn và làm việc cẩu thả đúng không?".',
    question: 'Thành viên Y đã sử dụng ngụy biện gì để công kích đề xuất của bạn X?',
    options: [
      {
        id: 'a',
        text: 'Ngụy biện Đòn bẩy quyền lực.',
        isCorrect: false,
        explanation: 'Sai. Y không dùng quyền lực chức vụ.'
      },
      {
        id: 'b',
        text: 'Ngụy biện Người rơm (Strawman): Cố tình bóp méo, thổi phồng hoặc biến tướng luận điểm của đối phương thành một phiên bản vô lý rồi tấn công vào phiên bản méo mó đó.',
        isCorrect: true,
        explanation: 'Xuất sắc! Bạn X chỉ muốn rà soát chất lượng, nhưng bạn Y đã bóp méo thành lời cáo buộc "đạo văn cẩu thả" để tạo cớ công kích.'
      },
      {
        id: 'c',
        text: 'Ngụy biện Viện dẫn số đông (Bandwagon).',
        isCorrect: false,
        explanation: 'Sai. Ở đây không đề cập đến ý kiến số đông.'
      }
    ]
  },
  {
    id: 'ssa_q22',
    step: 'Bước 6: Thu Hẹp Khoảng Cách Thực Thi (Implementation Gap)',
    scenario: 'Một kế hoạch cải tiến quy trình học tập được cả nhóm nhất trí 100% trên giấy, nhưng sau 2 tuần triển khai thực tế, không có bất kỳ đầu việc nào hoàn thành đúng hạn.',
    question: 'Đâu là nguyên nhân phổ biến nhất dẫn đến "Khoảng cách thực thi" (Implementation Gap) này?',
    options: [
      {
        id: 'a',
        text: 'Các đầu việc không được gán cụ thể cho một cá nhân chịu trách nhiệm chính (RACI Matrix) và thiếu các mốc kiểm tra định kỳ (Check-in milestones).',
        isCorrect: true,
        explanation: 'Rất chính xác! Trách nhiệm chung là không ai chịu trách nhiệm. Mô hình RACI (Responsible, Accountable, Consulted, Informed) là chìa khóa để kế hoạch biến thành hành động.'
      },
      {
        id: 'b',
        text: 'Do kế hoạch chưa được in ra trên giấy màu đẹp mắt.',
        isCorrect: false,
        explanation: 'Sai. Hình thức trình bày không quyết định năng lực kỷ luật thực thi.'
      },
      {
        id: 'c',
        text: 'Do các thành viên nhóm đều có chỉ số IQ quá cao nên không phù hợp làm việc chi tiết.',
        isCorrect: false,
        explanation: 'Sai lầm và ngụy biện.'
      }
    ]
  },
  {
    id: 'ssa_q23',
    step: 'Tư Duy Phản Biện: Hiệu Ứng Đóng Khung (Framing Effect)',
    scenario: 'Khi đề xuất áp dụng phần mềm học trực tuyến mới cho lớp, nhóm A thông báo: "Phần mềm này có tỷ lệ thành công 90%". Nhóm B lại thông báo: "Phần mềm này có tỷ lệ rủi ro thất bại 10%". Kết quả lớp biểu quyết ủng hộ nhóm A vượt trội.',
    question: 'Hiện tượng này phản ánh bẫy tâm lý nào trong ra quyết định?',
    options: [
      {
        id: 'a',
        text: 'Hiệu ứng Đóng khung (Framing Effect): Cách diễn đạt và đóng khung thông tin làm thay đổi hoàn toàn nhận thức và phản ứng của người nghe dù bản chất dữ liệu là giống hệt nhau.',
        isCorrect: true,
        explanation: 'Chính xác! Người có tư duy phản biện phải biết "tách vỏ bọc ngôn từ" để nhìn vào giá trị toán học thực tế của dữ liệu.'
      },
      {
        id: 'b',
        text: 'Hiệu ứng Mỏ neo (Anchoring Bias).',
        isCorrect: false,
        explanation: 'Sai. Hiệu ứng mỏ neo liên quan đến việc bị ấn tượng bởi con số đầu tiên được đưa ra trong đàm phán giá cả.'
      },
      {
        id: 'c',
        text: 'Phần mềm của nhóm A thực sự tốt hơn phần mềm của nhóm B gấp 9 lần.',
        isCorrect: false,
        explanation: 'Sai hoàn toàn. 90% thành công và 10% thất bại là 2 cách nói của cùng một xác suất.'
      }
    ]
  },
  {
    id: 'ssa_q24',
    step: 'Tư Duy Sáng Tạo: Kỹ Thuật Đảo Ngược Vấn Đề (Reverse Thinking)',
    scenario: 'Một doanh nghiệp du lịch muốn nâng cao chất lượng tour trong mùa thấp điểm. Thay vì hỏi: "Làm thế nào để khách hàng hài lòng hơn?", người điều phối hỏi: "Chúng ta có thể làm những điều tồi tệ nào để khiến khách hàng ức chế và không bao giờ quay lại?".',
    question: 'Mục đích thực sự của phương pháp "Tư duy đảo ngược" (Reverse Problem Solving) là gì?',
    options: [
      {
        id: 'a',
        text: 'Để trêu đùa và giải tỏa căng thẳng cho nhân viên trong giờ họp.',
        isCorrect: false,
        explanation: 'Sai. Đây là một phương pháp tư duy sáng tạo nghiêm túc.'
      },
      {
        id: 'b',
        text: 'Khai phóng tư duy bằng cách liệt kê các hành vi phá hoại tiềm ẩn, từ đó nhận diện được những điểm mù chết người mà bình thường không ai dám thừa nhận để phòng tránh.',
        isCorrect: true,
        explanation: 'Tuyệt vời! Con người thường dễ dàng chỉ ra những điều tiêu cực hơn là nghĩ ra điều hoàn hảo. Từ danh sách những điều gây hại, ta đảo ngược lại để tìm ra các giải pháp cải tiến bất ngờ.'
      },
      {
        id: 'c',
        text: 'Để chuẩn bị phương án trả đũa những khách hàng khó tính.',
        isCorrect: false,
        explanation: 'Sai nghiêm trọng về mặt đạo đức kinh doanh.'
      }
    ]
  }
];
