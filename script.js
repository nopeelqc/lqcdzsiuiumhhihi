let cheDo = 1;
let soBiMat = 0;
let luotToiDa = 0;
let soLuot = 0;
let thangCoBan = 0, thangKho = 0, thangAcMong = 0;
let danhHieuSoHuu = JSON.parse(localStorage.getItem("danhHieuSoHuu")) || [];

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
        document.getElementById("output").innerHTML = `
            <h3>❌ Lỗi</h3>
            <p>Vui lòng mô tả lỗi bạn gặp phải!</p>
            <button onclick="hienThiBaoCao()">Thử lại</button>
            <button onclick="veMenu()">Quay lại menu</button>
        `;
    }
}

function batDauChoi() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    out.innerHTML = `
        <h3>🎮 Chọn chế độ chơi</h3>
        <div id="mode-select-form">
            <p>Chọn chế độ:</p>
            <select id="cheDoInput">
                <option value="1">Cơ bản (8 lượt)</option>
                <option value="2">Khó (6 lượt)</option>
                <option value="3">Ác mộng (4 lượt)</option>
            </select>
            <div>
                <button onclick="confirmCheDo()">Xác nhận</button>
                <button onclick="veMenu()">Hủy</button>
            </div>
        </div>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function confirmCheDo() {
    const userInput = document.getElementById("cheDoInput").value;
    cheDo = Number(userInput);

    if (![1, 2, 3].includes(cheDo)) {
        document.getElementById("output").innerHTML = `
            <h3>❌ Lỗi</h3>
            <p>Chế độ không hợp lệ!</p>
            <button onclick="batDauChoi()">Thử lại</button>
            <button onclick="veMenu()">Quay lại menu</button>
        `;
        return;
    }

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.remove("hidden");
    document.getElementById("output").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");

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
    if (isNaN(doan) || doan <= 0 || doan > 100) {
        document.getElementById("output").classList.remove("hidden");
        document.getElementById("choi-game").classList.add("hidden");
        document.getElementById("output").innerHTML = `
            <h3>❌ Lỗi</h3>
            <p>Vui lòng nhập số từ 1 đến 100!</p>
            <button onclick="confirmCheDo()">Thử lại</button>
            <button onclick="veMenu()">Quay lại menu</button>
        `;
        return;
    }

    soLuot++;
    const conLai = luotToiDa - soLuot;
    document.getElementById("luotConLai").textContent = conLai;

    if (doan === soBiMat) {
        let tong = 0;
        if (cheDo === 1) tong = ++thangCoBan;
        if (cheDo === 2) tong = ++thangKho;
        if (cheDo === 3) tong = ++thangAcMong;
        const danhHieu = layDanhHieu(cheDo, tong);
        let thongBaoDanhHieu = "";
        if (danhHieu && !danhHieuSoHuu.includes(danhHieu)) {
            danhHieuSoHuu.push(danhHieu);
            localStorage.setItem("danhHieuSoHuu", JSON.stringify(danhHieuSoHuu));
            thongBaoDanhHieu = `<br>🏅 Nhận được danh hiệu: ${danhHieu}`;
        }
        document.getElementById("choi-game").classList.add("hidden");
        document.getElementById("output").classList.remove("hidden");
        document.getElementById("output").innerHTML = `
            <h3>🎉 Chúc mừng!</h3>
            <p>Bạn đã đoán đúng số ${soBiMat} sau ${soLuot} lượt!${thongBaoDanhHieu}</p>
            <button onclick="choiTiep()">Chơi tiếp</button>
            <button onclick="veMenu()">Về menu</button>
        `;
    } else if (soLuot >= luotToiDa) {
        document.getElementById("choi-game").classList.add("hidden");
        document.getElementById("output").classList.remove("hidden");
        document.getElementById("output").innerHTML = `
            <h3>😢 Thua cuộc!</h3>
            <p>Hết lượt! Số đúng là ${soBiMat}</p>
            <button onclick="choiTiep()">Chơi tiếp</button>
            <button onclick="veMenu()">Về menu</button>
        `;
    } else {
        document.getElementById("ketQua").textContent = doan < soBiMat ? "📈 Lớn hơn!" : "📉 Nhỏ hơn!";
        document.getElementById("inputDoan").value = "";
        document.getElementById("inputDoan").focus();
    }
}

function choiTiep() {
    document.getElementById("output").classList.add("hidden");
    batDauChoi();
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

function hienThiTopDanhHieu() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    const topPlayers = [
        { name: "vợ mh", titles: 12 },
        { name: "nopee", titles: 12 },
        { name: "qhuyzz", titles: 5 },
        { name: "danghaigs", titles: 5 },
        { name: "nhiepff", titles: 3 }
    ];
    out.innerHTML = `
        <h3>🏆 Top danh hiệu</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
            <tr>
                <th>Tên người chơi</th>
                <th>Số danh hiệu đạt được</th>
            </tr>
            ${topPlayers.map(player => `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.titles}</td>
                </tr>
            `).join('')}
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

function hienThiDonate() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    const topDonors = [
        { name: "vợ mh", amount: 10000000 },
        { name: "danghaigs", amount: 3000000 },
        { name: "nhiepff", amount: 2200000 },
        { name: "qhuyzz", amount: 2300000 },
        { name: "nopee", amount: 1000000 }
    ];
    out.innerHTML = `
        <h3>💖 Ủng hộ nhà phát triển</h3>
        <p>STK: <b>40004032006</b> - TPBank - <b>Lương Quốc Cường</b></p>
        <p>Hoặc đôi khi chỉ cần 1 follow qua trang facebook : <a href="https://www.facebook.com/Nopeedepptryy" target="_blank">https://www.facebook.com/Nopeedepptryy</a> để nhận các thông báo mới nhất</p>
        <p>Chân thành cảm ơn sự ủng hộ của bạn!</p>
        <h3>🏅 Top người ủng hộ</h3>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
            <tr>
                <th>Tên người ủng hộ</th>
                <th>Tổng số tiền ủng hộ (VND)</th>
            </tr>
            ${topDonors.map(donor => `
                <tr>
                    <td>${donor.name}</td>
                    <td>${donor.amount.toLocaleString()}</td>
                </tr>
            `).join('')}
        </table>
        <button onclick="veMenu()">Quay lại menu</button>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function thoatGame() {
    const out = document.getElementById("output");
    out.classList.remove("hidden");
    out.innerHTML = `
        <h3>👋 Xác nhận thoát</h3>
        <p>Bạn có chắc muốn thoát? Danh hiệu đã sở hữu sẽ bị xóa!</p>
        <button onclick="confirmThoat()">Xác nhận</button>
        <button onclick="veMenu()">Hủy</button>
    `;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
}

function confirmThoat() {
    localStorage.removeItem("danhHieuSoHuu");
    location.reload();
}
