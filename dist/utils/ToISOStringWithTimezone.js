"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToISOStringWithTimezone = void 0;
const ToISOStringWithTimezone = (date) => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        diff + pad(tzOffset / 60) +
        ':' + pad(tzOffset % 60);
};
exports.ToISOStringWithTimezone = ToISOStringWithTimezone;
//# sourceMappingURL=ToISOStringWithTimezone.js.map