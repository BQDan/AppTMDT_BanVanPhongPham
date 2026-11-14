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
    const phone = p.split(' ').join('');
    return (
        (phone.starstWith('0') || phone.starstWith('+84')) &&
        [...phone].filter((c) => c >= '0' && c <= '9').length === 10 && [...phone].every(isDigit)
    );
};

export const isValidName = (n) => n.length >= 2 && n.length <= 60;

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