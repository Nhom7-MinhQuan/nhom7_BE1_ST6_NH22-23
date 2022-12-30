-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 26, 2022 lúc 02:46 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nhom7`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manufactures`
--

CREATE TABLE `manufactures` (
  `manu_id` int(11) NOT NULL,
  `manu_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `manufactures`
--

INSERT INTO `manufactures` (`manu_id`, `manu_name`) VALUES
(1, 'Apple'),
(2, 'Oppo'),
(3, 'Samsung'),
(4, 'Sony'),
(5, 'MSI');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `manu_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `feature` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `manu_id`, `type_id`, `price`, `image`, `description`, `feature`, `created_at`) VALUES
(1, 'Điện thoại iPhone 14 Pro Max 128GB ', 1, 1, 33990000, 'iphone-14-pro-max.jpg', 'Màn hình:\n\nOLED6.7\"Super Retina XDR\nHệ điều hành:\n\niOS 16\nCamera sau:\n\nChính 48 MP & Phụ 12 MP, 12 MP\nCamera trước:\n\n12 MP\nChip:\n\nApple A16 Bionic\nRAM:\n\n6 GB\nDung lượng lưu trữ:\n\n128 GB\nSIM:\n\n1 Nano SIM & 1 eSIMHỗ trợ 5G\nPin, Sạc:\n\n4323 mAh20 W', 1, '2022-10-13 17:00:00'),
(2, 'Điện thoại iPhone 13 Pro 128GB', 1, 1, 25990000, 'iphone-13-pro.jpg', 'Màn hình:\r\n\r\nOLED6.1\"Super Retina XDR\r\nHệ điều hành:\r\n\r\niOS 15\r\nCamera sau:\r\n\r\n3 camera 12 MP\r\nCamera trước:\r\n\r\n12 MP\r\nChip:\r\n\r\nApple A15 Bionic\r\nRAM:\r\n\r\n6 GB\r\nDung lượng lưu trữ:\r\n\r\n128 GB\r\nSIM:\r\n\r\n1 Nano SIM & 1 eSIMHỗ trợ 5G\r\nPin, Sạc:\r\n\r\n3095 mAh20 W', 1, '2021-09-01 17:00:00'),
(3, 'Điện thoại OPPO A55', 2, 1, 4190000, 'oppo-a55-4g.jpg', 'Màn hình:\r\n\r\nIPS LCD6.5\"HD+\r\nHệ điều hành:\r\n\r\nAndroid 11\r\nCamera sau:\r\n\r\nChính 50 MP & Phụ 2 MP, 2 MP\r\nCamera trước:\r\n\r\n16 MP\r\nChip:\r\n\r\nMediaTek Helio G35\r\nRAM:\r\n\r\n4 GB\r\nDung lượng lưu trữ:\r\n\r\n64 GB\r\nSIM:\r\n\r\n2 Nano SIMHỗ trợ 4G\r\nPin, Sạc:\r\n\r\n5000 mAh18 W', 0, '2021-11-22 17:00:00'),
(4, 'Điện thoại OPPO Reno8 Pro 5G', 2, 1, 18490000, 'oppo-reno8-pro.jpg', 'Màn hình:\r\n\r\nAMOLED6.7\"Full HD+\r\nHệ điều hành:\r\n\r\nAndroid 12\r\nCamera sau:\r\n\r\nChính 50 MP & Phụ 8 MP, 2 MP\r\nCamera trước:\r\n\r\n32 MP\r\nChip:\r\n\r\nMediaTek Dimensity 8100 Max 8 nhân\r\nRAM:\r\n\r\n12 GB\r\nDung lượng lưu trữ:\r\n\r\n256 GB\r\nSIM:\r\n\r\n2 Nano SIMHỗ trợ 5G\r\nPin, Sạc:\r\n\r\n4500 mAh80 W', 1, '2022-01-10 17:00:00'),
(5, 'Điện thoại OPPO Reno7 Z 5G', 2, 1, 9090000, 'oppo-reno7.jpg', 'Màn hình:\r\n\r\nAMOLED6.43\"Full HD+\r\nHệ điều hành:\r\n\r\nAndroid 11\r\nCamera sau:\r\n\r\nChính 64 MP & Phụ 2 MP, 2 MP\r\nCamera trước:\r\n\r\n16 MP\r\nChip:\r\n\r\nSnapdragon 695 5G\r\nRAM:\r\n\r\n8 GB\r\nDung lượng lưu trữ:\r\n\r\n128 GB\r\nSIM:\r\n\r\n2 Nano SIM (SIM 2 chung khe thẻ nhớ)Hỗ trợ 5G\r\nPin, Sạc:\r\n\r\n4500 mAh33 W', 1, '2022-05-22 17:00:00'),
(6, 'Điện thoại Samsung Galaxy A23 4GB ', 3, 1, 5690000, 'samsung-galaxy-a23.jpg', 'Màn hình:\r\n\r\nPLS TFT LCD6.6\"Full HD+\r\nHệ điều hành:\r\n\r\nAndroid 12\r\nCamera sau:\r\n\r\nChính 50 MP & Phụ 5 MP, 2 MP, 2 MP\r\nCamera trước:\r\n\r\n8 MP\r\nChip:\r\n\r\nSnapdragon 680\r\nRAM:\r\n\r\n4 GB\r\nDung lượng lưu trữ:\r\n\r\n128 GB\r\nSIM:\r\n\r\n2 Nano SIMHỗ trợ 4G\r\nPin, Sạc:\r\n\r\n5000 mAh25 W', 1, '2022-06-09 17:00:00'),
(7, 'Điện thoại Samsung Galaxy Z Flip3 5G 256GB', 3, 1, 16990000, 'samsung-galaxy.jpg', 'Màn hình:\r\n\r\nDynamic AMOLED 2XChính 6.7\" & Phụ 1.9\"Full HD+\r\nHệ điều hành:\r\n\r\nAndroid 11\r\nCamera sau:\r\n\r\n2 camera 12 MP\r\nCamera trước:\r\n\r\n10 MP\r\nChip:\r\n\r\nSnapdragon 888\r\nRAM:\r\n\r\n8 GB\r\nDung lượng lưu trữ:\r\n\r\n256 GB\r\nSIM:\r\n\r\n1 Nano SIM & 1 eSIMHỗ trợ 5G\r\nPin, Sạc:\r\n\r\n3300 mAh15 W', 0, '2022-09-10 17:00:00'),
(8, 'Laptop Apple MacBook Air M1 2020 16GB/256GB/7-core GPU', 1, 2, 33490000, 'macbook-air.jpg', 'CPU:\r\n\r\nApple M1\r\nRAM:\r\n\r\n16 GB\r\nỔ cứng:\r\n\r\n256 GB SSD\r\nMàn hình:\r\n\r\n13.3\"Retina (2560 x 1600)\r\nCard màn hình:\r\n\r\nCard tích hợp7 nhân GPU\r\nCổng kết nối:\r\n\r\n2 x Thunderbolt 3 (USB-C)Jack tai nghe 3.5 mm\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nMac OS\r\nThiết kế:\r\n\r\nVỏ kim loại nguyên khối\r\nKích thước, khối lượng:\r\n\r\nDài 304.1 mm - Rộng 212.4 mm - Dày 4.1 mm đến 16.1 mm - Nặng 1.29 kg\r\nThời điểm ra mắt:\r\n\r\n2020', 0, '2022-10-01 17:00:00'),
(9, 'Laptop MSI Gaming GF63 Thin 11UC i5 ', 5, 2, 22990000, 'msi-gaming-gf63.jpg', 'CPU:\r\n\r\ni511400H2.7GHz\r\nRAM:\r\n\r\n8 GBDDR4 2 khe (1 khe 8 GB + 1 khe rời)3200 MHz\r\nỔ cứng:\r\n\r\nHỗ trợ khe cắm HDD SATA (nâng cấp tối đa 2TB)512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)\r\nMàn hình:\r\n\r\n15.6\"Full HD (1920 x 1080)\r\nCard màn hình:\r\n\r\nCard rờiRTX 3050 4GB\r\nCổng kết nối:\r\n\r\nUSB Type-CLAN (RJ45)3 x USB 3.2HDMIJack tai nghe 3.5 mm\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nWindows 10 Home SL\r\nThiết kế:\r\n\r\nVỏ nhựa - nắp lưng bằng kim loại\r\nKích thước, khối lượng:\r\n\r\nDài 359 mm - Rộng 254 mm - Dày 21.7 mm - Nặng 1.86 kg\r\nThời điểm ra mắt:\r\n\r\n2021', 1, '2021-09-11 17:00:00'),
(10, 'Laptop MSI Gaming Pulse GL66 11UDK i7 ', 5, 2, 33990000, 'msi-gaming-pulse-gl66.jpg', 'CPU:\r\n\r\ni711800H2.30 GHz\r\nRAM:\r\n\r\n16 GBDDR4 2 khe (1 khe 8 GB + 1 khe 8 GB)3200 MHz\r\nỔ cứng:\r\n\r\n512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)Không hỗ trợ khe cắm HDD\r\nMàn hình:\r\n\r\n15.6\"Full HD (1920 x 1080) 144Hz\r\nCard màn hình:\r\n\r\nCard rờiRTX 3050Ti 4GB\r\nCổng kết nối:\r\n\r\nUSB Type-CLAN (RJ45)USB 2.02 x USB 3.2HDMIJack tai nghe 3.5 mm\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nWindows 10 Home SL\r\nThiết kế:\r\n\r\nVỏ nhựa - nắp lưng bằng kim loại\r\nKích thước, khối lượng:\r\n\r\nDài 359 mm - Rộng 259 mm - Dày 23.95 mm - Nặng 2.25 kg\r\nThời điểm ra mắt:\r\n\r\n2021', 1, '2022-01-21 17:00:00'),
(11, 'Laptop MSI Modern 15 A11MU i5 ', 5, 2, 15490000, 'msi-modern-15-a11mu-i5.jpg', 'CPU:\r\n\r\ni51155G72.5GHz\r\nRAM:\r\n\r\n8 GBDDR4 2 khe (1 khe 8 GB + 1 khe rời)3200 MHz\r\nỔ cứng:\r\n\r\n512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)Hỗ trợ thêm 1 khe cắm SSD M.2 PCIe mở rộng (nâng cấp tối đa 2TB)\r\nMàn hình:\r\n\r\n15.6\"Full HD (1920 x 1080)\r\nCard màn hình:\r\n\r\nCard tích hợpIntel Iris Xe\r\nCổng kết nối:\r\n\r\nUSB Type-CUSB 2.0HDMIJack tai nghe 3.5 mm2 x USB 3.2\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nWindows 10 Home SL\r\nThiết kế:\r\n\r\nNắp lưng và chiếu nghỉ tay bằng kim loại\r\nKích thước, khối lượng:\r\n\r\nDài 356.8 mm - Rộng 233.75 mm - Dày 16.9 mm - Nặng 1.6 kg\r\nThời điểm ra mắt:\r\n\r\n2021', 1, '2022-10-11 17:00:00'),
(12, 'Laptop MSI Gaming Bravo 15 B5DD R7 ', 5, 2, 20490000, 'msi-gaming-bravo-15.jpg', 'CPU:\r\n\r\nRyzen 75800H3.2GHz\r\nRAM:\r\n\r\n8 GBDDR4 2 khe (1 khe 8 GB + 1 khe rời)3200 MHz\r\nỔ cứng:\r\n\r\n512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)Không hỗ trợ khe cắm HDD\r\nMàn hình:\r\n\r\n15.6\"Full HD (1920 x 1080)\r\nCard màn hình:\r\n\r\nCard rờiRX 5500M 4GB\r\nCổng kết nối:\r\n\r\nUSB Type-CLAN (RJ45)USB 2.0HDMIJack tai nghe 3.5 mm2 x USB 3.2\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nWindows 11 Home SL\r\nThiết kế:\r\n\r\nVỏ nhựa\r\nKích thước, khối lượng:\r\n\r\nDài 359 mm - Rộng 259 mm - Dày 24.95 mm - Nặng 2.35 kg\r\nThời điểm ra mắt:\r\n\r\n2021', 0, '2021-10-10 17:00:00'),
(13, 'Laptop MSI Gaming GF63 Thin 11UD i7 ', 5, 2, 26490000, 'msi-gaming-gf63-thin-11ud-i7.jpg', 'CPU:\r\n\r\ni711800H2.30 GHz\r\nRAM:\r\n\r\n8 GBDDR4 2 khe (1 khe 8 GB + 1 khe rời)3200 MHz\r\nỔ cứng:\r\n\r\nHỗ trợ khe cắm HDD SATA 2.5 inch mở rộng (nâng cấp tối đa 2 TB)512 GB SSD NVMe PCIe (Có thể tháo ra, lắp thanh khác tối đa 2TB)\r\nMàn hình:\r\n\r\n15.6\"Full HD (1920 x 1080)\r\nCard màn hình:\r\n\r\nCard rờiNVIDIA GeForce RTX 3050Ti Max-Q, 4GB\r\nCổng kết nối:\r\n\r\nUSB Type-CLAN (RJ45)3x Type-A USB 3.2 Gen 1HDMIJack tai nghe 3.5 mm\r\nĐặc biệt:\r\n\r\nCó đèn bàn phím\r\nHệ điều hành:\r\n\r\nWindows 11 Home SL\r\nThiết kế:\r\n\r\nVỏ kim loại\r\nKích thước, khối lượng:\r\n\r\nDài 359 mm - Rộng 254 mm - Dày 21.7 mm - Nặng 1.86 kg\r\nThời điểm ra mắt:\r\n\r\n2021', 0, '2022-05-11 17:00:00'),
(14, 'Apple Watch SE 40mm viền nhôm dây silicone', 1, 4, 6742000, 'oppo-band-den-thumb-600x600.jpg', 'Màn hình:\r\n\r\nOLED1.57 inch\r\nThời lượng pin:\r\n\r\nKhoảng 1.5 ngày\r\nKết nối với hệ điều hành:\r\n\r\niPhone 8 trở lên với iOS phiên bản mới nhất\r\nMặt:\r\n\r\nIon-X strengthened glass\r\nTính năng cho sức khỏe:\r\n\r\nTính lượng calories tiêu thụTính quãng đường chạyChế độ luyện tậpTheo dõi giấc ngủĐo nhịp timĐếm số bước chân', 1, '2022-10-29 17:00:00'),
(15, 'Apple Watch S6 44mm viền nhôm dây silicone', 1, 4, 7143000, 'oppo-band-den-thumb-600x600.jpg', 'Màn hình:\r\n\r\nOLED1.78 inch\r\nThời lượng pin:\r\n\r\nKhoảng 1.5 ngày\r\nKết nối với hệ điều hành:\r\n\r\niPhone 8 trở lên với iOS phiên bản mới nhất\r\nMặt:\r\n\r\nIon-X strengthened glass\r\nTính năng cho sức khỏe:\r\n\r\nTính quãng đường chạyTính lượng calories tiêu thụĐo nồng độ oxy (SpO2)Đếm số bước chânChế độ luyện tậpTheo dõi giấc ngủĐiện tâm đồĐo nhịp tim', 1, '2022-10-22 17:00:00'),
(16, 'Vòng đeo tay thông minh Oppo Band 2', 2, 4, 1990000, 'oppo-band-den-thumb-600x600.jpg', 'Màn hình:\r\n\r\nAMOLED1.57 inch\r\nThời lượng pin:\r\n\r\nKhoảng 14 ngày\r\nKết nối với hệ điều hành:\r\n\r\nAndroid 6.0 trở lêniOS 13 trở lên\r\nMặt:\r\n\r\nKính cường lực\r\nTính năng cho sức khỏe:\r\n\r\nTính lượng calories tiêu thụĐo nồng độ oxy (SpO2)Theo dõi nhịp tim 24hĐo lượng tiêu thụ oxy tối đa (VO2 max)Theo dõi giấc ngủĐo nhịp timĐếm số bước chânTheo dõi mức độ căng thẳng 24hNhắc nhở uống nước', 0, '2022-10-25 17:00:00'),
(17, 'Loa Bluetooth Sony Extra Bass SRS-XB23', 4, 5, 2490000, 'loa-bluetooth-sony.jpg', 'Nguồn:\r\n\r\nPin\r\nThời gian sử dụng:\r\n\r\nDùng khoảng 12 tiếngSạc khoảng 4 tiếng\r\nKết nối không dây:\r\n\r\nBluetooth 5.0\r\nTiện ích:\r\n\r\nChống nước, chống bụi IP67\r\nPhím điều khiển:\r\n\r\nNút Party ConnectNút BATT kiểm tra pinNút ST PAIRPhát/dừng chơi nhạcTăng/giảm âm lượngChuyển bài hátBật/tắt bluetooth\r\nThương hiệu của:\r\n\r\nNhật Bản\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 0, '2021-12-27 17:00:00'),
(18, 'Loa Bluetooth Sony SRS-XE200', 4, 5, 2950000, 'loa-bluetooth-sony-srs.jpg', 'Nguồn:\r\n\r\nType C 5V DC\r\nThời gian sử dụng:\r\n\r\nDùng khoảng 16 tiếngSạc khoảng 4 tiếng\r\nKết nối không dây:\r\n\r\nBluetooth 5.2\r\nTiện ích:\r\n\r\nKết nối không dây nhiều loa cùng lúcSạc nhanhChống nước, chống bụi IP67\r\nPhím điều khiển:\r\n\r\nPhát/dừng chơi nhạcBật / tắt nguồnBật/Tắt âm bassTắt âm khi nhận cuộc gọiNhận cuộc gọiTăng/giảm âm lượngBật/tắt bluetooth\r\nThương hiệu của:\r\n\r\nNhật Bản\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 1, '2022-05-11 17:00:00'),
(19, 'Loa Bluetooth Sony SRS-XB13 ', 4, 5, 1190000, 'bluetooth-sony-srs-xb13-avatar-600x600.jpg', 'Tổng công suất:\r\n\r\n5 W\r\nNguồn:\r\n\r\nPin\r\nThời gian sử dụng:\r\n\r\nDùng khoảng 16 tiếngSạc khoảng 4 - 5 tiếng\r\nKết nối không dây:\r\n\r\nBluetooth 4.2\r\nTiện ích:\r\n\r\nKết nối cùng lúc 2 loaChống nước, chống bụi IP67\r\nPhím điều khiển:\r\n\r\nNút nguồnPhát/dừng chơi nhạcTăng/giảm âm lượngBật/tắt bluetoothNghe/nhận cuộc gọi\r\nThương hiệu của:\r\n\r\nNhật Bản\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 0, '2022-04-07 17:00:00'),
(20, 'Google Tivi Sony 4K 43 inch KD-43X75K ', 4, 3, 11400000, 'google-sony-4k-43-inch-kd-43x75k-1.jpg', 'Loại tivi:\r\n\r\nGoogle Tivi43 inch4K\r\nHệ điều hành\r\n\r\nGoogle TV\r\nỨng dụng phổ biến\r\n\r\nClip TVFPT PlayGalaxy Play (Fim+)NetflixVieONVTVcab ONYouTube\r\nCông nghệ hình ảnh:\r\n\r\nChuyển động mượt Motionflow XR 200\r\nĐiều khiển bằng giọng nói\r\n\r\nGoogle Assistant có tiếng ViệtTìm kiếm giọng nói trên YouTube bằng tiếng Việt\r\nRemote thông minh:\r\n\r\nRemote tích hợp micro tìm kiếm bằng giọng nói (RMF-TX520P)\r\nChiếu hình từ điện thoại lên TV\r\n\r\nChromecast\r\nKích thước:\r\n\r\nNgang 97 cm - Cao 62 cm - Dày 23.1 cm\r\nNăm ra mắt:\r\n\r\n2022\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 1, '2022-07-12 17:00:00'),
(21, 'Google Tivi Sony 4K 50 inch KD-50X75K ', 4, 3, 13900000, 'vi-vn-google-sony-4k-50-inch-kd-50x75k-1.jpg', 'Loại tivi:\r\n\r\nGoogle Tivi50 inch4K\r\nHệ điều hành\r\n\r\nGoogle TV\r\nỨng dụng phổ biến\r\n\r\nClip TVFPT PlayGalaxy Play (Fim+)NetflixVieONVTVcab ONYouTube\r\nCông nghệ hình ảnh:\r\n\r\nChuyển động mượt Motionflow XR 200\r\nĐiều khiển bằng giọng nói\r\n\r\nGoogle Assistant có tiếng ViệtTìm kiếm giọng nói trên YouTube bằng tiếng Việt\r\nRemote thông minh:\r\n\r\nRemote tích hợp micro tìm kiếm bằng giọng nói (RMF-TX520P)\r\nChiếu hình từ điện thoại lên TV\r\n\r\nChromecast\r\nKích thước:\r\n\r\nNgang 112.7 cm - Cao 70.6 cm - Dày 23 cm\r\nNăm ra mắt:\r\n\r\n2022\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 1, '2022-10-10 17:00:00'),
(22, 'Google Tivi Sony 32 inch KD-32W830K ', 4, 3, 8200000, 'vi-vn-google-sony-32-inch-kd-32w830k-1.jpg', 'Loại tivi:\r\n\r\nGoogle Tivi32 inchHD\r\nHệ điều hành\r\n\r\nGoogle TV\r\nỨng dụng phổ biến\r\n\r\nClip TVFPT PlayGalaxy Play (Fim+)NetflixVieONVTVcab ONYouTube\r\nCông nghệ hình ảnh:\r\n\r\nChuyển động mượt Motionflow XR 200Màu sắc sống động Live ColourNâng cấp hình ảnh X-Reality PRO\r\nĐiều khiển bằng giọng nói\r\n\r\nGoogle Assistant có tiếng ViệtTìm kiếm giọng nói trên YouTube bằng tiếng Việt\r\nRemote thông minh:\r\n\r\nRemote tích hợp micro tìm kiếm bằng giọng nói (RMF-TX520P)\r\nChiếu hình từ điện thoại lên TV\r\n\r\nChromecast\r\nKích thước:\r\n\r\nNgang 73 cm - Cao 46.5 cm - Dày 18.8 cm\r\nNăm ra mắt:\r\n\r\n2022\r\nHãng\r\n\r\nSony. Xem thông tin hãng', 1, '2022-07-28 17:00:00'),
(23, 'Smart Tivi QLED 4K 43 inch Samsung QA43Q65A ', 3, 3, 12800000, 'qled-4k-samsung-qa43q65a-2.jpg', 'Loại tivi:\r\n\r\nSmart Tivi QLED43 inch4K\r\nHệ điều hành\r\n\r\nTizen OS 6.0\r\nỨng dụng phổ biến\r\n\r\nClip TVFPT PlayGalaxy Play (Fim+)MP3 ZingMyTVNetflixPOPS KidsSpotifyTrình duyệt webVieONYouTube\r\nCông nghệ hình ảnh:\r\n\r\nAmbient ModeBrightness/Color DetectionChuyển động mượt Motion Xcelerator TurboGiảm độ trễ chơi game Auto Low Latency Mode (ALLM)HDR10+Quantum DotQuantum HDRSuper Ultra Wide Game View & Game BarSupreme UHD Dimming\r\nĐiều khiển bằng giọng nói\r\n\r\nBixby (Chưa có tiếng Việt)Google Assistant có tiếng ViệtTìm kiếm giọng nói trên YouTube bằng tiếng Việt\r\nRemote thông minh:\r\n\r\nOne Remote sạc qua USB C & ánh sáng\r\nChiếu hình từ điện thoại lên TV\r\n\r\nAirPlay 2Tap View\r\nKích thước:\r\n\r\nNgang 96.5 cm - Cao 62.3 cm - Dày 18.7 cm\r\nNăm ra mắt:\r\n\r\n2021\r\nHãng\r\n\r\nSamsung. Xem thông tin hãng', 1, '2022-10-08 17:00:00'),
(24, 'Smart Tivi Samsung 4K Crystal UHD 50 inch UA50AU8100', 3, 3, 17400000, 'led-4k-samsung-ua50au8100-1.jpg', 'Loại tivi:\r\n\r\nSmart Tivi50 inch4K\r\nHệ điều hành\r\n\r\nTizen OS 6.0\r\nỨng dụng phổ biến\r\n\r\nClip TVFPT PlayGalaxy Play (Fim+)MP3 ZingMyTVNetflixPOPS KidsSpotifyTrình duyệt webVieONYouTube\r\nCông nghệ hình ảnh:\r\n\r\nAmbient ModeChuyển động mượt Motion XceleratorChuyển động ảnh mượt mà Auto Motion PlusDynamic Crystal ColorGiảm độ trễ chơi game Auto Low Latency Mode (ALLM)HDR10+Kiểm soát đèn nền UHD DimmingNâng cấp độ tương phản Contrast Enhancer\r\nĐiều khiển bằng giọng nói\r\n\r\nBixby (Chưa có tiếng Việt)Google Assistant có tiếng ViệtTìm kiếm giọng nói trên YouTube bằng tiếng Việt\r\nRemote thông minh:\r\n\r\nOne Remote\r\nChiếu hình từ điện thoại lên TV\r\n\r\nAirPlay 2Screen MirroringTap View\r\nKích thước:\r\n\r\nNgang 111.8 cm - Cao 70.2 cm - Dày 22.8 cm\r\nNăm ra mắt:\r\n\r\n2021\r\nHãng\r\n\r\nSamsung. Xem thông tin hãng', 1, '2021-10-08 17:00:00'),
(25, 'Điện thoại OPPO A16K', 2, 1, 3090000, 'oppo-a16k-thumb1-600x600-1-600x600.jpg', 'Màn hình:\r\n\r\nIPS LCD6.52\"HD+\r\nHệ điều hành:\r\n\r\nAndroid 11\r\nCamera sau:\r\n\r\n13 MP\r\nCamera trước:\r\n\r\n5 MP\r\nChip:\r\n\r\nMediaTek Helio G35\r\nRAM:\r\n\r\n3 GB\r\nDung lượng lưu trữ:\r\n\r\n32 GB\r\nSIM:\r\n\r\n2 Nano SIMHỗ trợ 4G\r\nPin, Sạc:\r\n\r\n4230 mAh10 W', 0, '2021-11-29 17:00:00'),
(26, 'Loa thanh Samsung HW-A450', 3, 5, 3490000, 'thanh-samsung-hw-a450-1.-600x600.jpg', 'Tổng công suất:\r\n\r\n300W\r\nCông suất loa chính:\r\n\r\n80W\r\nSố lượng kênh:\r\n\r\n2.1 kênh\r\nCông nghệ âm thanh:\r\n\r\nAdaptive Sound LiteBass BoostSurround Sound ExpansionTối ưu âm thanh chơi Game với chế độ Game Mode\r\nKết nối không dây:\r\n\r\n6.5\'\' subwoofer không dâyBluetoothĐiều khiển thông minh One Remote Control\r\nKết nối khác:\r\n\r\nOpticalUSB\r\nThương hiệu của:\r\n\r\nHàn Quốc\r\nHãng\r\n\r\nSamsung. Xem thông tin hãng', 0, '2022-04-24 17:00:00'),
(27, 'Loa tháp Samsung MX-T50/XV ', 3, 5, 5890000, 'samsung-mx-t50-xv-11-600x600.jpg', 'Tổng công suất:\r\n\r\n500W\r\nKết nối không dây:\r\n\r\nBluetooth\r\nKết nối khác:\r\n\r\nAUXJack 6.5 MicroUSB\r\nPhím điều khiển:\r\n\r\nNút bấm - vặn cơ họcĐiều khiển cảm ứng\r\nThương hiệu của:\r\n\r\nHàn Quốc\r\nHãng\r\n\r\nSamsung. Xem thông tin hãng', 1, '2021-12-15 17:00:00'),
(28, 'Loa thanh Samsung HW-Q700B ', 3, 5, 10990000, 'product-273906-170522-020826-600x600.png', 'Tổng công suất:\r\n\r\n320W\r\nCông suất loa chính:\r\n\r\n37 W\r\nSố lượng kênh:\r\n\r\n3.1.2 kênh\r\nCông nghệ âm thanh:\r\n\r\nAdaptive SoundChế độ Surround Sound Expansion – Âm thanh vòm mở rộngCông nghệ Q-SymphonyCông nghệ âm thanh chuẩn Dolby Atmos/DTS:XSpaceFit SoundTối ưu âm thanh chơi Game với chế độ Game Mode Pro\r\nKết nối không dây:\r\n\r\nAirPlay 2BluetoothKết nối SpotfifyKết nối TV qua Wifi\r\nKết nối khác:\r\n\r\nHDMIHDMI eARC\r\nThương hiệu của:\r\n\r\nHàn Quốc\r\nHãng\r\n\r\nSamsung. Xem thông tin hãng', 1, '2021-11-29 17:00:00'),
(29, 'Đồng hồ thông minh Oppo Watch Free', 2, 4, 1790000, 'oppo-watch-free-thumb-600x600.jpg', 'Màn hình:\r\n\r\nAMOLED1.64 inch\r\nThời lượng pin:\r\n\r\nKhoảng 14 ngày\r\nKết nối với hệ điều hành:\r\n\r\nAndroid 6.0 trở lêniOS 10 trở lên\r\nMặt:\r\n\r\nKính thường 2.5D46 mm\r\nTính năng cho sức khỏe:\r\n\r\nĐo nồng độ oxy (SpO2)Theo dõi nhịp thởNhắc nhở ít vận độngChế độ luyện tậpTheo dõi giấc ngủĐa dạng hình thức luyện tậpĐo nhịp timTheo dõi nhịp tim 24h\r\nHãng\r\n\r\nOppo. Xem thông tin hãng', 1, '2021-11-29 17:00:00'),
(30, 'Vòng đeo tay thông minh Oppo Band', 2, 4, 790000, 'oppo-band-den-thumb-600x600.jpg', 'Màn hình:\r\n\r\nAMOLED1.1 inch\r\nThời lượng pin:\r\n\r\nKhoảng 12 ngày\r\nKết nối với hệ điều hành:\r\n\r\nAndroid 6.0 trở lêniOS 10 trở lên\r\nMặt:\r\n\r\nKính thường 2.5D40.4 mm40.4 mm\r\nDây:\r\n\r\n20.4 cm\r\nTính năng cho sức khỏe:\r\n\r\nĐo nồng độ oxy (SpO2)Theo dõi giấc ngủĐo nhịp timĐếm số bước chân\r\nTiện ích:\r\n\r\nBáo thứcTừ chối cuộc gọiTìm điện thoạiĐiều khiển chơi nhạcDự báo thời tiếtĐồng hồ bấm giờ\r\nHãng\r\n\r\nOppo. Xem thông tin hãng', 0, '2022-04-24 17:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `protypes`
--

CREATE TABLE `protypes` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `type_image` varchar(150) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `protypes`
--

INSERT INTO `protypes` (`type_id`, `type_name`, `type_image`) VALUES
(1, 'Điện Thoại', 'samsung-galaxy-z-fold-3-z-flip-3-12.jpg'),
(2, 'Laptop', 'LaVie-Z.jpg'),
(3, 'Tivi', 'vi-vn-google-sony-4k-50-inch-kd-50x75k-1.jpg'),
(4, 'Đồng Hồ', 's6-44mm.jpg'),
(5, 'Loa', 'shop03.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role_id`) VALUES
(1, 'admin1', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(2, 'admin2', '6562c5c1f33db6e05a082a88cddab5ea', 2),
(7, 'admin1', '81dc9bdb52d04dc20036dbd8313ed055', 0),
(8, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 0),
(9, 'vantrong', 'c03c22a6483faa89013d9a2f88511078', 0),
(10, '21211tt1690', '827ccb0eea8a706c4c34a16891f84e7b', 0),
(11, 'admin5', 'c4ca4238a0b923820dcc509a6f75849b', 0),
(12, 'admin6', '827ccb0eea8a706c4c34a16891f84e7b', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `manufactures`
--
ALTER TABLE `manufactures`
  ADD PRIMARY KEY (`manu_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `protypes`
--
ALTER TABLE `protypes`
  ADD PRIMARY KEY (`type_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `manufactures`
--
ALTER TABLE `manufactures`
  MODIFY `manu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `protypes`
--
ALTER TABLE `protypes`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
