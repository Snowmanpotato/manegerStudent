//tạo mảng chứa object
class student {
    constructor(Code, Name, Dob, Gender, Mail, Pic) {
        this.Code = Code;
        this.Name = Name;
        this.Dob = Dob;
        this.Gender = Gender;
        this.Mail = Mail;
        this.Pic = Pic;
    }
};
const key_data = 'manegerStudent_data'
const avatar_url = 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar';
var students = [];
function init() {
    if (getData(key_data) == null) {
        students = [
            new student('1', 'Đặng Phước Duy', '01/01/1999', 'Nam', 'duy@gmail.com', `${avatar_url}/1.jpg`),
            new student('2', 'Hà Văn Luyn', '01/01/1999', 'Nam', 'duy@gmail.com', `${avatar_url}/2.jpg`),
            new student('3', 'Nguyễn Trí Quốc Cường', '01/01/1999', 'Nam', 'duy@gmail.com', `${avatar_url}/3.jpg`),
            new student('4', 'Nguyễn Dũng', '01/01/1999', 'Nam', 'duy@gmail.com', `${avatar_url}/4.jpg`)
        ];
        setData(key_data, students);
    }
    else {
        students = getData(key_data);
    }
};
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setData(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}
//tạo hàm in dữ liệu trong mảng stdents
function renderStudents() {
    let htmls = students.map(function (student, index) {
        return `
            <tr id="tr_${index}">
                <td id='td1${index}'>${student.Code}</td>
                <td id='td2${index}'>${student.Name}</td>
                <td id='td3${index}'>${student.Dob}</td>
                <td id='td4${index}'>${student.Gender}</td>
                <td id='td5${index}'>${student.Mail}</td>
                <td id='td6${index}'>
                <img class="avatar-sm" img width="100px" height="100px" src="${student.Pic}" alt="">
                </td>   
                <td>          
                    <button class='btn btn-buttonSave ' onclick='saveEdit(${index})'>Lưu</button>           
                    <button class='btn btn-buttonUpdate' onclick='updateStudent(${index})'>Sửa</button>           
                    <button class='btn btn-buttonDel' onclick='delStudent(${index})'>Xóa</button>           
            </tr>
            `;
    })
    document.querySelector(`.table2>tbody`).innerHTML = htmls.join('');
};

//hàm thêm học viên
function addStudent() {
    let code = document.querySelector('#cod').value;
    let name = document.querySelector('#name').value;
    let date = document.querySelector('#dob').value;
    let gender = document.querySelector('input[name="Gender"]:checked').value;
    let mail = document.querySelector('#mail').value;
    let pic = document.querySelector('#img').value;
    let student = {
        Code: code,
        Name: name,
        Dob: date,
        Gender: gender,
        Mail: mail,
        Pic: pic
    }

    students.push(student);
    setData(key_data, students);
    renderStudents();
    resetModal();
}
//reset bảng nhập
function resetModal() {
    document.querySelector('#cod').value = '';
    document.querySelector('#name').value = '';
    document.querySelector('#dob').value = '';
    document.querySelector('input[name="Gender"]:checked').checked = false;
    document.querySelector('.table1>tbody>#mail').value = '';
    document.querySelector('#img').src = '';
}

// hàm xóa học viên
function delStudent(index) {
    let confirm = window.confirm('Bạn có muốn xóa dữ liệu học viên này không?');
    if (confirm) {
        students.splice(index, 1);
        setData(key_data, students);
        renderStudents();
    }
}
//hàm sửa học viên
function updateStudent(index) {
    document.querySelector(`#td1${index}`).innerHTML = `<input type="number" value='${students[index].Code}'>`;
    document.querySelector(`#td2${index}`).innerHTML = `<input type="text" value='${students[index].Name}'>`;
    document.querySelector(`#td3${index}`).innerHTML = `<input type="text" value='${students[index].Dob}'>`;
    document.querySelector(`#td4${index}`).innerHTML = `<input type="text" value='${students[index].Gender}'>`;
    document.querySelector(`#td5${index}`).innerHTML = `<input type="email" value='${students[index].Mail}'>`;
    document.querySelector(`#td6${index}`).innerHTML = `<input type="url" value='${students[index].Pic}'>`;
    setData(key_data, students);
}
//hàm lưu học viên                                                                            
function saveEdit(index) {
    students[index].Code = document.querySelector(`#td1${index}>input`).value;
    students[index].Name = document.querySelector(`#td2${index}>input`).value;
    students[index].Dob = document.querySelector(`#td3${index}>input`).value;
    students[index].Gender = document.querySelector(`#td4${index}>input`).value;
    students[index].Mail = document.querySelector(`#td5${index}>input`).value;
    students[index].Pic = document.querySelector(`#td6${index}>input`).value;
    renderStudents();
}

function reddy() {
    init();
    renderStudents();
}
reddy()

