Một ngày đẹp trời lướt internet ngoài sân bay, đang đọc dở 1 phốt dài như một tờ sớ, máy bay cất cánh và **bùm** bạn không thể đọc tiếp đoạn phốt vừa rồi vì nhỡ tay reload trang.
Nhìn sang facebook tự dưng thấy lạ lạ, rõ ràng trên trời không có internet, nhưng có vẻ không ảnh hưởng đến hoạt động.
À khoan facebook là app, còn kia là web.
Câu hỏi tự nhiên nhảy ra trong đầu: "Website mà không cần internet vẫn hoạt động được có vẻ là thú vị".

Ví dụ: bạn có trang soạn thảo văn bản (như onedrive chẳng hạn), sẽ thật tuyệt vời nếu như bạn vẫn có thể thoải mái soạn thảo văn bản khi đang ngồi trên máy bay, tắt máy tính khi xuống máy bay và ra quan coffee ngồi soạn thảo tiếp tục, ngay khi có internet, những gì bạn đã soạn thảo sẽ được đồng bộ với serve.

HOÀN HẢO!!!

Nhưng vấn đề là khi không có mạng, thì không mở được trang web. Vậy có cách nào để kể cả không có mạng thì bạn vẫn mở được trang web hay không?

# Website hỗ trợ ngoại tuyến

Website hỗ trợ ngoại tuyến là các trang web hoặc ứng dụng web có khả năng hoạt động mà không cần kết nối Internet. Điều này thường được thực hiện bằng cách lưu trữ dữ liệu và nội dung cần thiết trên thiết bị của người dùng, cho phép họ truy cập và sử dụng các tính năng cơ bản ngay cả khi không có mạng.

# Giải pháp

Sử dụng service worker của javascript để tạo một Website hỗ trợ ngoại tuyến.

# Cài đặt:

Thực hiện lệnh js sau khi mở trang.

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/offline-worker.js?v=1.0.0')
        .then(function(registration) {
            console.log('Service Worker đăng ký thành công:', registration);
        })
        .catch(function(error) {
            alert('Service Worker đăng ký thất bại:', error);
        });
}
```

Tạo file offline-worker.js để cài đặt cache.

```javascript
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('lyrics-cache') // Tên cache
            .then(function (cache) {
                return cache.addAll([
                    '', // Router cho phép chạy offline
                    '/index.html', // HTML cho phép chạy offline
                    '/offline', // Router cho phép chạy offline
                    '/offline/index.html', // HTML cho phép chạy offline
                    '/images/1.jpg', // Ảnh cho phép hiển thị khi chạy offline
                    '/images/2.jpg', // Ảnh cho phép hiển thị khi chạy offline
                    '/images/3.jpg', // Ảnh cho phép hiển thị khi chạy offline
                    '/images/4.jpg', // Ảnh cho phép hiển thị khi chạy offline
                    '/images/5.jpg', // Ảnh cho phép hiển thị khi chạy offline
                ]);
            })
    );
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['lyrics-cache'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    );
});
```

Với đoạn code trên chúng ta đã lưu lại các thành phần tĩnh của trang web.
Mỗi khi người dùng truy cập vào trang web, serviceWorker sẽ được chạy trước tiên (trước cả khi gửi request đến serve).

Vì thế kể cả trong trường hợp không có internet, thì serviceWorker vẫn sẽ hoạt động.
Nếu không có internet, thì serviceWorker sẽ lấy thông tin từ cache và hiển thị cho người dùng.

# Ví dụ:

Hãy thử truy cập vào trang web sau:
https://han48.github.io/web-offline/
Sau đó tắt hết tất cả các phương thức truy cập internet trên máy tính hoặc điện thoại của bạn.
Thử gõ truy cập vào một trang web khác như https://www.google.com/ chẳng hạn.
Bạn sẽ thấy Google không hiển thị.
Truy cập trang web trên 1 lần nữa.
Bạn sẽ thấy trang web này hiển thị bình thường như lúc có internet.

# Tiềm năng của website hỗ trợ ngoại tuyến

Việc phát triển một website hỗ trợ ngoại tuyến bằng JavaScript Service Worker có rất nhiều tiềm năng và lợi ích. Dưới đây là một số điểm nổi bật:
1. **Cải thiện trải nghiệm người dùng**: Service Worker cho phép website hoạt động ngay cả khi không có kết nối mạng. Điều này giúp người dùng có thể truy cập nội dung đã được lưu trữ trước đó mà không gặp gián đoạn.
2. **Tăng tốc độ tải trang**: Bằng cách cache các tài nguyên tĩnh như hình ảnh, CSS, và JavaScript, Service Worker giúp giảm thời gian tải trang, mang lại trải nghiệm mượt mà hơn cho người dùng.
3. **Thông báo đẩy**: Service Worker có thể xử lý thông báo đẩy, giúp website tương tác với người dùng ngay cả khi họ không mở trang web.
4. **Tiết kiệm băng thông**: Việc sử dụng cache giúp giảm lượng dữ liệu cần tải từ máy chủ, tiết kiệm băng thông và giảm chi phí cho cả người dùng và nhà cung cấp dịch vụ.
5. **Tăng tính bảo mật**: Service Worker chỉ hoạt động trên các trang web được phục vụ qua HTTPS, giúp đảm bảo an toàn cho dữ liệu người dùng.

Sẽ thế nào nếu website của công ty bạn hỗ trợ ngoại tuyến?
Khách hàng không cần mạng internet vẫn có thể tìm hiểu về công ty của bạn khi đang di chuyển trên máy bay.
Team marketing không còn căng thẳng mỗi khi serve website của công ty bạn tự dưng lăn đùng ra chết khiến cho việc chạy quảng cáo trở thành xấu hổ khi khách hàng quay sang hỏi "Tao không xem được website của mày".