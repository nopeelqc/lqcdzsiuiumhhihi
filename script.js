let cheDo = 1;
let soBiMat = 0;
let luotToiDa = 0;
let soLuot = 0;
let thangCoBan = 0, thangKho = 0, thangAcMong = 0;
let danhHieuSoHuu = [];

document.getElementById("inputDoan").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        doanSo();
    }
});

function hienThiGioiThieu() {
    const out = document.getElementById("gioi-thieu");
    out.classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("output").classList.add("hidden");
}

function hienThiBaoCao() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    out.innerHTML = `
        <h3>📝 Báo cáo lỗi</h3>
        <div id="bao-cao-form">
            <p>Mô tả lỗi bạn gặp phải:</p>
            <textarea id="moTaLoi"></textarea>
            <button onclick="guiBaoCao()">Gửi</button>
            <p id="bao-cao-thanh-cong" class="hidden">✅ Đã gửi báo cáo thành công</p>
        </div>
        <p>Hoặc vui lòng phản hồi trực tiếp về trang Facebook sau: <a href="https://www.facebook.com/Nopeedepptryy" target="_blank">https://www.facebook.com/Nopeedepptryy</a></p>
        <button onclick="veMenu()">Quay lại menu</button>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function guiBaoCao() {
    const moTa = document.getElementById("moTaLoi").value;
    if (moTa.trim() !== "") {
        console.log("Báo cáo đã gửi:", moTa);
        document.getElementById("bao-cao-thanh-cong").classList.remove("hidden");
        document.getElementById("moTaLoi").value = "";
    } else {
        alert("Vui lòng mô tả lỗi bạn gặp phải!");
    }
}

function batDauChoi() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.remove("hidden");
    document.getElementById("output").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");

    cheDo = Number(prompt("Chọn chế độ:\n1. Cơ bản (8 lượt)\n2. Khó (6 lượt)\n3. Ác mộng (4 lượt)"));
    if (![1, 2, 3].includes(cheDo)) return alert("Chế độ không hợp lệ!");

    if (cheDo === 1) luotToiDa = 8;
    if (cheDo === 2) luotToiDa = 6;
    if (cheDo === 3) luotToiDa = 4;

    soBiMat = Math.floor(Math.random() * 100) + 1;
    soLuot = 0;

    document.getElementById("cheDoText").textContent = cheDo === 1 ? "Cơ bản" : cheDo === 2 ? "Khó" : "Ác mộng";
    document.getElementById("luotConLai").textContent = luotToiDa;
    document.getElementById("ketQua").textContent = "";
    document.getElementById("inputDoan").value = "";
    document.getElementById("inputDoan").focus();
}

function doanSo() {
    const doan = Number(document.getElementById("inputDoan").value);
    if (isNaN(doan) || doan < 1 || doan > 100) {
        alert("Vui lòng nhập số từ 1 đến 100");
        return;
    }

    soLuot++;
    const conLai = luotToiDa - soLuot;
    document.getElementById("luotConLai").textContent = conLai;

    if (doan === soBiMat) {
        document.getElementById("ketQua").textContent = `🎉 Chính xác sau ${soLuot} lượt!`;
        let tong = 0;
        if (cheDo === 1) tong = ++thangCoBan;
        if (cheDo === 2) tong = ++thangKho;
        if (cheDo === 3) tong = ++thangAcMong;
        const danhHieu = layDanhHieu(cheDo, tong);
        if (danhHieu && !danhHieuSoHuu.includes(danhHieu)) {
            danhHieuSoHuu.push(danhHieu);
            document.getElementById("ketQua").textContent += `\n🏅 Nhận được danh hiệu: ${danhHieu}`;
        }
        setTimeout(veMenu, 3000);
    } else if (soLuot >= luotToiDa) {
        document.getElementById("ketQua").textContent = `😢 Hết lượt! Số đúng là ${soBiMat}`;
        setTimeout(veMenu, 3000);
    } else {
        document.getElementById("ketQua").textContent = doan < soBiMat ? "📈 Lớn hơn!" : "📉 Nhỏ hơn!";
    }

    document.getElementById("inputDoan").value = "";
    document.getElementById("inputDoan").focus();
}

function veMenu() {
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("output").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

function layDanhHieu(cheDo, soLan) {
    if (cheDo === 1) {
        if (soLan === 1) return "Tân thủ nhân phẩm";
        if (soLan === 2) return "Tân binh toàn năng";
        if (soLan <= 5) return "Tân thủ";
        if (soLan <= 8) return "Tân thủ nghị lực";
    } else if (cheDo === 2) {
        if (soLan === 1) return "Tiên tri";
        if (soLan === 2) return "Siêu phàm";
        if (soLan <= 4) return "Đồ Tể";
        if (soLan <= 6) return "Kẻ chinh phục";
    } else if (cheDo === 3) {
        if (soLan === 1) return "Tân Thần";
        if (soLan === 2) return "Á Thần";
        if (soLan === 3) return "Ngụy Thần";
        if (soLan >= 4) return "Não To";
    }
    return "";
}

function hienThiDanhHieu() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    out.innerHTML = `
        <h3>🏆 Tất cả danh hiệu:</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
            <tr>
                <th>Chế độ</th>
                <th>Danh hiệu</th>
                <th>Điều kiện</th>
            </tr>
            <tr><td rowspan="4"><b>Cơ bản</b></td><td>Tân thủ nhân phẩm</td><td>Thắng trong 1 lượt</td></tr>
            <tr><td>Tân binh toàn năng</td><td>Thắng trong 2 lượt</td></tr>
            <tr><td>Tân thủ</td><td>Thắng trong 3-5 lượt</td></tr>
            <tr><td>Tân thủ nghị lực</td><td>Thắng trong 6-8 lượt</td></tr>

            <tr><td rowspan="4"><b>Khó</b></td><td>Tiên tri</td><td>Thắng trong 1 lượt</td></tr>
            <tr><td>Siêu phàm</td><td>Thắng trong 2 lượt</td></tr>
            <tr><td>Đồ Tể</td><td>Thắng trong 3-4 lượt</td></tr>
            <tr><td>Kẻ chinh phục</td><td>Thắng trong 5-6 lượt</td></tr>

            <tr><td rowspan="4"><b>Ác mộng</b></td><td>Tân Thần</td><td>Thắng trong 1 lượt</td></tr>
            <tr><td>Á Thần</td><td>Thắng trong 2 lượt</td></tr>
            <tr><td>Ngụy Thần</td><td>Thắng trong 3 lượt</td></tr>
            <tr><td>Não To</td><td>Thắng trong 4 lượt</td></tr>
        </table>
        <button onclick="veMenu()">Quay lại menu</button>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function hienThiDanhHieuSoHuu() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    if (danhHieuSoHuu.length === 0) {
        out.innerHTML = `<p>❗ Bạn hiện tại không có danh hiệu, hãy cùng chinh phục những danh hiệu mới nhất!</p><button onclick="veMenu()">Quay lại menu</button>`;
    } else {
        out.innerHTML = "<h3>🏅 Danh hiệu đã sở hữu:</h3>" + danhHieuSoHuu.map(dh => `- ${dh}`).join("<br>") + `<button onclick="veMenu()">Quay lại menu</button>`;
    }
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function hienThiDonate() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    out.innerHTML = `
        <h3>💖 Ủng hộ nhà phát triển</h3>
        <p>STK: <b>40004032006</b> - TPBank - <b>Luong Quoc Cuong</b></p>
        <p>Chân thành cảm ơn sự ủng hộ của bạn!</p>
        <p>Hoặc đôi khi chỉ cần 1 follow qua trang facebook : <a href="https://www.facebook.com/Nopeedepptryy" target="_blank">https://www.facebook.com/Nopeedepptryy</a> de nhan cac  thong bao moi nhat</p>
        <button onclick="veMenu()">Quay lại menu</button>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function thoatGame() {
    alert("Hẹn gặp lại bạn!");
    location.reload();
}