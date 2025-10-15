// قائمة اقتراحات عامة حسب نوع الوقود أو نوع السيارة
const generalSuggestions = [
  "تحقق من ضغط الإطارات",
  "قم بتغيير الزيت إذا لزم الأمر",
  "افحص مستويات السوائل",
  "نظف فلتر الهواء",
  "افحص البطارية",
  "اغسل السيارة للحفاظ على الطلاء",
  "افحص نظام التبريد",
  "تحقق من الفرامل",
  "افحص مساحات الزجاج",
  "قم بفحص الأضواء الأمامية والخلفية",
  "نظف المقصورة الداخلية",
  "قم بفحص أحزمة السير",
  "تحقق من نظام التعليق",
  "افحص العادم",
  "قم بتلميع السيارة للحفاظ على الطلاء",
  "تحقق من فرامل اليد",
  "افحص حساس البنزين",
  "تأكد من سلامة أنابيب الوقود",
  "افحص المصابيح الداخلية والخارجية",
  // ... أضف المزيد لتصل تقريباً 100 اقتراح
];

// دالة لإعطاء اقتراحات ديناميكية حسب السيارة
export function getAISuggestions(car) {
  const suggestions = [];

  const today = new Date();
  if (car.lastService) {
    const lastDate = new Date(car.lastService);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays >= 30) suggestions.push("يجب فحص السيارة شهرياً");
    if (diffDays >= 90) suggestions.push("مر 3 أشهر على آخر خدمة، يوصى بحجز خدمة الآن");
    if (diffDays >= 180) suggestions.push("مر 6 أشهر على آخر خدمة، يجب القيام بصيانة شاملة");
    if (diffDays >= 365) suggestions.push("مر سنة على آخر خدمة، يجب فحص جميع أنظمة السيارة");
  }

  if (car.mileage && parseInt(car.mileage) >= 5000)
    suggestions.push("السيارة وصلت لمسافة كبيرة منذ آخر صيانة، تحقق من الزيت والفلاتر");

  if (car.fuelType === "ديزل") suggestions.push("ننصح بفحص فلتر الديزل بانتظام");
  if (car.fuelType === "بنزين") suggestions.push("فحص نظام الاشتعال والمشغلات");

  // اقتراحات عشوائية يومية: نختار بعض الاقتراحات بناءً على اليوم
  const daySeed = today.getDate() + today.getMonth() + today.getFullYear(); // تغيير يومياً
  const randomIndex = (index) => (index + daySeed) % generalSuggestions.length;

  for (let i = 0; i < 5; i++) { // نعطي 5 اقتراحات عشوائية يومية
    suggestions.push(generalSuggestions[randomIndex(i)]);
  }

  // إزالة الاقتراحات المكررة
  return [...new Set(suggestions)];
}