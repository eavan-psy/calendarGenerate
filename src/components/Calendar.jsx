import { useState } from "react";
import { getMonthDays, months, weekDays, getYearInfo } from "../utils/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Calendar = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [inputYear, setInputYear] = useState(currentYear.toString());
  const [error, setError] = useState(null);
  const yearInfo = getYearInfo();

  const handleYearSubmit = () => {
    const newYear = parseInt(inputYear);
    if (newYear >= 1900 && newYear <= 2100) {
      setYear(newYear);
      setError(null);
    } else {
      setError("请输入1900-2100之间的年份");
    }
  };

  const handleDownload = async () => {
    try {
      const calendar = document.getElementById("calendar-container");
      const canvas = await html2canvas(calendar, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`calendar-${year}.pdf`);
    } catch (err) {
      console.error("下载PDF失败:", err);
      setError("下载PDF失败，请稍后重试");
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>
          刷新页面
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            type="number"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            className="w-24"
            min="1900"
            max="2100"
          />
          <Button onClick={handleYearSubmit}>
            确认
          </Button>
        </div>
        <Button onClick={handleDownload}>
          下载PDF
        </Button>
      </div>
      
      <div 
        id="calendar-container" 
        className="bg-white w-full mx-auto"
        style={{
          aspectRatio: "210/297",
          padding: "3%"
        }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold mb-2">{year}年年历</h1>
          <p className="text-xl font-bold text-gray-600">
            农历{yearInfo.lunarYear}年 · {yearInfo.zodiac}年
          </p>
        </div>
        
        <div 
          id="calendar"
          className="grid grid-cols-3 gap-4"
        >
          {months.map((month, index) => (
            <div key={month} className="border-4 rounded-lg p-2 shadow-sm">
              <h2 className="text-base font-extrabold mb-2 text-center">
                {month}
              </h2>
              <div className="grid grid-cols-7 gap-0.5">
                {weekDays.map(day => (
                  <div key={day} className="text-center font-extrabold text-xs p-0.5">
                    {day}
                  </div>
                ))}
                {getMonthDays(year, index + 1).map((day, i) => (
                  <div
                    key={i}
                    className={`text-center p-0.5 ${
                      day?.isWeekend ? "text-red-500" : ""
                    } ${!day ? "invisible" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-bold leading-tight">{day.day}</div>
                        <div className="text-xs leading-tight text-gray-500 font-bold">
                          {day.lunar}
                        </div>
                        {day.jieqi && (
                          <div className="text-xs leading-tight text-emerald-600 font-bold" style={{ fontFamily: "'FangSong', serif" }}>
                            {day.jieqi}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
