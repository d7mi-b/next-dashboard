import { Car, ToolCase, User, Users } from "lucide-react";
import WorkCompletionSectionHeader from "./work-completion-section-header";

const vehicle = {
    "نوع السيارة": "تويوتا كامري",
    "الموديل": "2022",
    "الغرض": "صيانة دورية",
    "الرقم": "أ ب ج 1 2 3",
    "المركز التابع له": "مركز الصيانة المركزي",
    "الموقع": "الرياض"
}

const maintance = [
    {
        service: "تزويد فلتر",
        notes: "فلتر هواء جديد",
        quantity: "100",
        unit: "حبة"
    },
    {
        service: "تزويد فلتر",
        notes: "فلتر هواء جديد",
        quantity: "100",
        unit: "حبة"
    },
    {
        service: "تزويد فلتر",
        notes: "فلتر هواء جديد",
        quantity: "100",
        unit: "حبة"
    },
    {
        service: "تزويد فلتر",
        notes: "فلتر هواء جديد",
        quantity: "100",
        unit: "حبة"
    }
]

export default function WorkCompletionTemplate({
    userData
}: {
    userData: {
        name: string;
        email: string;
        phone: string;
    };
}) {
    return (
        <section style={{ fontSize: "12px" }}>
            <header style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
                <section
                    style={{
                        width: "5rem",
                        height: "5rem",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                        borderRadius: "0.25rem",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/logo.png`} alt="Logo" />
                </section>
                <h1 
                    className="primary-color" 
                    style={{ 
                        fontSize: "1.2rem", 
                        margin: "0 0.5rem",
                        borderBottom: "2px solid #ec6d2f",
                        paddingBottom: "0.25rem",
                        width: "fit-content",
                        fontWeight: "bold"
                    }}
                >
                    مشهد إنجاز أعمال الصيانة
                </h1>
            </header>

            <section style={{ display: "grid", gap: "0.25rem", gridTemplateColumns: "repeat(3, 1fr)" }}>
                <section>
                    <header className="primary-color" style={{ fontWeight: 500 }}>
                        <h3>رقم الطلب:</h3>
                    </header>
                    <section style={{ paddingBottom: "8px", borderBottom: "1px solid #e5e7eb", marginTop: "8px" }}>
                        <p>1234567890</p>
                    </section>
                </section>
                <section>
                    <header className="primary-color" style={{ fontWeight: 500 }}>
                        <h3>تاريخ الطلب:</h3>
                    </header>
                    <section style={{ paddingBottom: "8px", borderBottom: "1px solid #e5e7eb", marginTop: "8px" }}>
                        <p>{ new Date().toDateString() }</p>
                    </section>
                </section>
            </section>

            <section style={{ marginTop: "1rem" }}>
                <WorkCompletionSectionHeader title="معلومات المركبة" icon={<Car style={{ fontSize: "4px" }} />} />

                <section style={{ width: "100%", display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {
                        Object.keys(vehicle).map((key) => (
                            <section style={{ margin: "0.25rem 0" }}>
                                <header className="primary-color" style={{ fontWeight: 500 }}>
                                    <h3>{key}:</h3>
                                </header>
                                <section style={{ padding: "8px", border: "1px solid #e5e7eb", borderRadius: "8px", marginTop: "8px" }}>
                                    <p>{vehicle[key as keyof typeof vehicle]}</p>
                                </section>
                            </section>
                        ))
                    }
                </section>
            </section>

            <section style={{ width: "100%", marginTop: "1rem", backgroundColor: "#fff8ed", border: "1px solid #ff6b35", borderRadius: "8px", padding: "0.75rem" }}>
                <p>تم الإنتهاء من إجراء أعمال الصيانة مع إستلام المركبة وهي كالتالي: </p>
            </section>

            <section style={{ marginTop: "1rem" }}>
                <WorkCompletionSectionHeader title="تفاصيل أعمال الصيانة" icon={<ToolCase style={{ fontSize: "4px" }} />} />
                
                <table style={{ width: "100%", fontSize: "12px", borderRadius: "0.5rem", overflow: "hidden", borderSpacing: "0" }}>
                    <thead style={{ backgroundColor: "#1f3a8a", color: "#fff", textAlign: "right" }}>
                        <tr>
                            {
                                ["التسلسل", "الخدمات والصيانات", "الملاحظات", "الكمية", "الوحدة"].map((key, index) => (
                                    <th style={{padding: "0.5rem", borderLeft: "1px solid #7482af"}} key={index}>{key}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            maintance.map((item, index) => (
                                <tr key={index}>
                                    <td style={{padding: "0.5rem", border: "1px solid #e0e2e6", width: "max-content"}}>{index + 1}</td>
                                    {
                                        Object.keys(item).map((key, index) => (
                                            <td style={{padding: "0.5rem", border: "1px solid #e0e2e6", width: "max-content"}} key={index}>{item[key as keyof typeof item]}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

            <section style={{ marginTop: "1rem" }}>
                <WorkCompletionSectionHeader title="بيانات مستلم المركبة من مركز الصيانة" icon={<User style={{ fontSize: "4px" }} />} />
                
                <section style={{ width: "100%", display: "grid", gap: "0.25rem", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {
                        ["الاسم", "التوقيع", "رقم الجوال"].map((key, index) => (
                            <section style={{ fontSize: "12px" }} key={index}>
                                <header className="primary-color" style={{ fontWeight: 500 }}>
                                    <h3>{key}:</h3>
                                </header>
                                <section style={{ height: "24px", borderBottom: "1px solid #e5e7eb", marginTop: "8px" }}></section>
                            </section>
                        ))
                    }
                </section>
            </section>

            <section style={{ marginTop: "1rem" }}>
                <WorkCompletionSectionHeader title="الأعضاء الفنيين" icon={<Users style={{ fontSize: "4px" }} />} />
                
                <section style={{ width: "100%", display: "grid", gap: "0.25rem", gridTemplateColumns: "repeat(2, 1fr)" }}>
                    {
                        ["الاسم", "التوقيع"].map((key, index) => (
                            <section key={index}>
                                <header className="primary-color" style={{ fontWeight: 500 }}>
                                    <h3>{key}:</h3>
                                </header>
                                <section style={{ height: "24px", borderBottom: "1px solid #e5e7eb", marginTop: "8px" }}></section>
                            </section>
                        ))
                    }
                </section>
            </section>

            <section style={{ marginTop: "1rem" }}>
                <WorkCompletionSectionHeader title="اعتماد وتصديق مدير الورشة" />
                
                <section style={{ width: "100%", display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(5, 1fr)" }}>
                    {
                        ["الاسم", "التوقيع"].map((key, index) => (
                            <section style={{ gridColumn: "span 2" }} key={index}>
                                <header className="primary-color" style={{ fontWeight: 500 }}>
                                    <h3>{key}:</h3>
                                </header>
                                <section style={{ height: "24px", borderBottom: "1px solid #e5e7eb", marginTop: "8px" }}></section>
                            </section>
                        ))
                    }
                    <section>
                        <section style={{ fontSize: "12px", width: "96px", height: "96px", borderRadius: "50%", border: "1px dashed #bebfc2ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                            <p>ختم المركز</p>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
}