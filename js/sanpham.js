function taoDoiTuongSanPham(hinhAnh, ten, giaGoc, phanTramGiamGia, khuVuc, id) {
    var sanPham = new Object();

    sanPham.hinhAnh = hinhAnh;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;
    sanPham.khuVuc = khuVuc;

    if (id != null) {
        sanPham.id = id;
    } else {
        sanPham.id = taoId();
    }


    //viết phương thức cho đối tượng
    sanPham.tinhGiaBan = function () {
        var giaBan = this.giaGoc * (100 - this.phanTramGiamGia);
        return giaBan;
    }

    sanPham.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }

    sanPham.fromJSON = function (json) {
        var doiTuongTuDay = new Object();

        var doiTuong = JSON.parse(json);
        //chuyển thành đối tượng đầy đủ
        var doiTuongTuDay = taoSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.giaGoc, doiTuong.khuVuc);
        return doiTuongTuDay;
    }
    //trả về danh sách đầy đủ 
    sanPham.fromJSONs = function (jsonDanhSachSanPham) {
        var danhSachSanPhamTuDay = new Array();
        var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
        console.log(danhSachSanPham)
        
        for (var i = 0; i < danhSachSanPham.length; i++) {
            var sanPham = danhSachSanPham[i];
            var HTMLSanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc);
            danhSachSanPhamTuDay = danhSachSanPhamTuDay + HTMLSanPham;
            
        }
        danhSachSanPhamTuDay = danhSachSanPhamTuDay + '</div>';
    }
    return sanPham;
}


function taoDanhSachSanPham(danhSachSanPham) {
    var HTMLDanhSachSanPham = '<div class="items">';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongDanhSachThanhHTML(sanPham);
        HTMLDanhSachSanPham = HTMLDanhSachSanPham + htmlSanPham;
    }
    HTMLDanhSachSanPham = HTMLDanhSachSanPham + '</div>';
    return HTMLDanhSachSanPham;
}

//chuyển danh sách đối tượng thành html
//in: danh sách
//out: html hiển thị danh sách
function chuyenDoiTuongDanhSachThanhHTML(sanPham) {
    sanPham = taoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.khuVuc, sanPham.id);

    var html = '';

    html = '   <div class="item">  '  + 
    '               <div class="item-thumb">  '  + 
    '                   <img src="'+sanPham.hinhAnh+'"  '  + 
    '                           alt="" srcset="">  '  + 
    '               </div>  '  + 
    '                   <h2 class="ten-san-pham">'+sanPham.ten+'</h2>  '  + 
    '               <div class="gia">  '  + 
    '                   <span class="gia-goc">'+sanPham.giaGoc+'</span>  '  + 
    '                   <span class="giam-gia">'+sanPham.tinhGiaBan()+'</span>  '  + 
    '               </div>  '  + 
    `                   <button class="btn" onclick ="themVaoGioHang1('`+sanPham.id+`')">Đưa vào giỏ hàng</button>  `  + 
    '              </div>  ' ; 
    
    return html;
}
function layGiohangTuLocalStorage() {
    var gioHang = new Array();
    //lấy json
    var jsonGioHang = localStorage.getItem('gioHang');
    //chuyển json thành đối tượng giỏ hàng
    if (jsonGioHang != null)
        gioHang = JSON.parse(jsonGioHang);

    return gioHang;
}
function themVaoGioHang1(idSanPham) {
    var danhSachGioHang = layGiohangTuLocalStorage();
    //tạo đối tượng giỏ hàng
     taoDoiTuongItemGioHang(idSanPham, 1);
    //thêm vào giỏ hàng item mới


}
//lưu trữ xuống local storage

function taoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    var danhSachGioHang = layGiohangTuLocalStorage();
    var kiemTra = true;
    for (let i = 0; i < danhSachGioHang.length; i++) {
        if(danhSachGioHang[i].idSanPham == idSanPham){
            danhSachGioHang[i].soLuong++;
            kiemTra =false;
        }
    }
    console.log("ahihihihehhe")
    if(kiemTra){
        itemGioHang.idSanPham = idSanPham;
        itemGioHang.soLuong = soLuong;
        danhSachGioHang.push(itemGioHang);
    }
        

    localStorage.setItem('gioHang', JSON.stringify(danhSachGioHang));

}
function laySanPhamTheoId(idSanPham) {
    var sanPham = new Object();
    //load ds sản phẩm dưới local storage lên
    var danhSachSanPham = layDanhSachSanPhamLocalStorage();
    //tìm đối tượng trong danh sách có id
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == idSanPham) {
            sanPham = sanPhamHienTai;
        }
    }
    SanPham = taoDoiTuongSanPham(SanPham.hinhAnh, SanPham.ten, SanPham.giaGoc, SanPham.phanTramGiamGia, SanPham.khuVuc, SanPham.id);
    return SanPham;
    //lấy lên danh sách toàn bộ đối tượng
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

    //kiểm tra các id của đối tượng

    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if (sanPhamHienTai.id == id) {
            return sanPhamHienTai;
        }
    }
}

function layDanhSachSanPhamLocalStorage() {
    //load json
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');

    //chuyển json thành đối tượng
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    return danhSachSanPham;
}