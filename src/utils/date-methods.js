/*
 * @Overview:   Date-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 16:02
 * @Mark:       //
 */

/**
 * 倒计时计算年，天，时，分，秒
 * @param targetTime {number | string} 目标时间（将来的设定时间）
 * @param startTime {number | string} 开始时间（一般为现在时间）
 * @return {{years: *, days: *, hours: *, minutes: *, seconds: *}} 返回对象
 */
export const returnLeftTime = (targetTime, startTime) => {
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return String(i);
  }
  let currTime = startTime || new Date().getTime();
  let leftTime = Number(targetTime) - Number(currTime);
  if (leftTime >= 0) {
    let years = parseInt(String(leftTime / 1000 / 60 / 60 / 24 / 365), 10);
    let days = parseInt(String(leftTime / 1000 / 60 / 60 / 24), 10);
    let hours = parseInt(String((leftTime / 1000 / 60 / 60) % 24), 10);
    let minutes = parseInt(String((leftTime / 1000 / 60) % 60), 10);
    let seconds = parseInt(String((leftTime / 1000) % 60), 10);
    return {
      years: checkTime(years),
      days: checkTime(days),
      hours: checkTime(hours),
      minutes: checkTime(minutes),
      seconds: checkTime(seconds)
    };
  }
};

/**
 * 获取当前日期的N个月/天前后的日期
 * @param months {number} N月，+N 表示N月之后; -N 表示N月之前
 * @param days {number} N日， +N 表示N天之后; -N 表示N天之前
 * @param isZero {boolean} 是否需要补零 true(默认) 需要;
 * @param joinSign {string} 日期连接符号 ‘-’(默认)
 * @return {string} 输出需求格式
 */
export const getFewMonthAgoOrAfterDate = (
  months = 0,
  days = 0,
  isZero = true,
  joinSign = "-"
) => {
  let dt = new Date();
  dt.setMonth(dt.getMonth() + months, dt.getDate() + days);
  let Year = dt.getFullYear();
  let Month = dt.getMonth() + 1;
  let Day = dt.getDate();
  if (isZero) {
    Month = Month < 10 ? "0" + Month : Month;
    Day = Day < 10 ? "0" + Day : Day;
  }
  return `${Year}${joinSign}${Month}${joinSign}${Day}`;
};

/**
 * 是否为闰年
 * @return {boolean} 输出需求格式
 */
export const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
