import { Lunar } from "lunar-javascript";
import dayjs from "dayjs";

export const getYearInfo = () => {
  return {
    lunarYear: "乙巳",
    zodiac: "蛇"
  };
};

export const getMonthDays = (year, month) => {
  const firstDay = dayjs(`${year}-${month}-01`);
  const totalDays = firstDay.daysInMonth();
  const firstDayWeek = firstDay.day();
  
  const days = [];
  for (let i = 0; i < firstDayWeek; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= totalDays; i++) {
    const date = dayjs(`${year}-${month}-${i}`);
    const lunar = Lunar.fromDate(date.toDate());
    
    let lunarText = lunar.getDayInChinese();
    if (lunar.getDay() === 1) {
      lunarText = `${lunar.getMonthInChinese()}月`;
    }
    
    const jieqi = lunar.getJieQi();
    
    days.push({
      day: i,
      lunar: lunarText,
      jieqi: jieqi,
      isWeekend: date.day() === 0 || date.day() === 6,
    });
  }
  
  return days;
};

export const months = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月"
];

export const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
