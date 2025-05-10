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

        if (cheDo === 1) ++thangCoBan;
        if (cheDo === 2) ++thangKho;
        if (cheDo === 3) ++thangAcMong;

        const danhHieu = layDanhHieu(cheDo, soLuot);
        if (danhHieu && !danhHieuSoHuu.includes(danhHieu)) {
            danhHieuSoHuu.push(danhHieu);
            localStorage.setItem("danhHieuSoHuu", JSON.stringify(danhHieuSoHuu));
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

function layDanhHieu(cheDo, soLuot) {
    if (cheDo === 1) {
        if (soLuot === 1) return "Tân thủ nhân phẩm";
        if (soLuot === 2) return "Tân binh toàn năng";
        if (soLuot <= 5) return "Tân thủ";
        if (soLuot <= 8) return "Tân thủ nghị lực";
    } else if (cheDo === 2) {
        if (soLuot === 1) return "Tiên tri";
        if (soLuot === 2) return "Siêu phàm";
        if (soLuot <= 4) return "Đồ Tể";
        if (soLuot <= 6) return "Kẻ chinh phục";
    } else if (cheDo === 3) {
        if (soLuot === 1) return "Tân Thần";
        if (soLuot === 2) return "Á Thần";
        if (soLuot === 3) return "Ngụy Thần";
        if (soLuot === 4) return "Não To";
    }
    return "";
}

function hienThiDanhHieu() {
    const danhSach = [
        "Tân thủ nhân phẩm", "Tân binh toàn năng", "Tân thủ", "Tân thủ nghị lực",
        "Tiên tri", "Siêu phàm", "Đồ Tể", "Kẻ chinh phục",
        "Tân Thần", "Á Thần", "Ngụy Thần", "Não To"
    ];
    alert("🏅 Danh hiệu trong game:\n" + danhSach.join("\n"));
}

function hienThiDanhHieuSoHuu() {
    if (danhHieuSoHuu.length === 0) {
        alert("😢 Bạn chưa có danh hiệu nào.");
    } else {
        alert("🏆 Danh hiệu đã sở hữu:\n" + danhHieuSoHuu.join("\n"));
    }
}

function hienThiDonate() {
    alert("💖 Cảm ơn bạn đã quan tâm! Nếu muốn ủng hộ, hãy gửi MoMo đến 0123xxxxxxx.");
}

function hienThiGioiThieu() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.remove("hidden");
}

function veMenu() {
    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("choi-game").classList.add("hidden");
    document.getElementById("output").classList.add("hidden");
    document.getElementById("gioi-thieu").classList.add("hidden");
    document.getElementById("ketQua").textContent = "";
}
