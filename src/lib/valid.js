const isDigit = (c) => c >= '0' && c <= '9';

export const cleanText = (t, max) => 
    String(t ?? '').split('<').join('').split('>').join('').trim().slice(0, max);

export const noEmpty = (e) => String(e ?? '').trim().length > 0;

export const isValidEmail = (e)=> {
    const email = String(e ?? '').trim();
    const atIndex = email.indexOf('@');
    const doIndex = email.lastIndexOf('.');
    return (
        atIndex > 0 &&
        email.indexOf('@', atIndex +1) === -1 &&
        doIndex > atIndex+1 &&
        doIndex < email.length-2 &&
        !email.includes(' ')
    );
};

export const isValidPhone = (p) => {
    let phone = String(p ?? '').split(' ').join('');
    if(phone.startsWith('+84')) phone = '0' + phone.slice(3);
    return phone.length === 10 && phone.startsWith('0') && [...phone].every(isDigit);
};

export const isValidName = (n) => {
    const name = String(n ?? '').trim();
    return name.length >= 2 && name.length <= 60;
};

export function validatePassword(password) {
    const errors = [];
    const pw = String(password ?? '').split('');

    if(pw.length < 8) errors.push('tối thiểu 8 ký tự');

    if(!pw.split('').some((c) => c >= 'a' && c <= 'z'))
        errors.push('có chữ thường');
    if(!pw.split('').some((c) => c >= 'A' && c <= 'Z'))
        errors.push('có chữ hoa');
    if(!pw.split('').some((c) => c >= '0' && c <= '9'))
        errors.push('có số');

    return errors;
}

export const isValidAddress = (a) => String(a ?? '').trim().length >= 10;