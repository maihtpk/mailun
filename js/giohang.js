//tạo nhanh đối tượng item giỏ hàng
//input id số lượng sản phẩm
//output đối tượng item giỏ hàng

function taoDoiTuongThemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;

    return itemGioHang;
}

/* Mô tả lấy thông tin từ local storage
input
output: giỏ hàng = danh sách item giỏ hàng*/
function layGioHangTuLocalStorage() {
    var danhSachItemGioHang = new Array();
    var jsonDanhSachItemGioHang = localStorage.getItem('gioHang');

    if (jsonDanhSachItemGioHang != null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);

    return danhSachItemGioHang;
}
/*Mô tả  */
function themVaoGioHang(idSanPham, danhSachItemGioHang) {
    var danhSachItemGioHangSauKhiDuocThem = danhSachItemGioHang;
    var itemGioHang = taoDoiTuongThemGioHang(idSanPham, 1);

    danhSachItemGioHangSauKhiDuocThem.push(itemGioHang);
    return danhSachItemGioHangSauKhiDuocThem;
}

/* Mô tả lưu trữ giỏ hàng xuống local storage
input: giỏ hàng = danh sách item giỏ hàng
output  */
function luuGioHangXuongLocalStorage(danhSachItemGioHang) {
    //todo
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);

    localStorage.setItem('gioHang', jsonDanhSachItemGioHang);
}

function taoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}