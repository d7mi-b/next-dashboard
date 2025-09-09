import { ReactNode } from "react";

export default function WorkCompletionSectionHeader({ title, icon }: { title: string; icon?: ReactNode }) {
    return (
        <header style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            {
                icon &&
                <section
                    style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        padding: "0.25rem",
                        backgroundColor: "#1f3a8a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {icon}
                </section>
            }
            <h2
                className="primary-color" 
                style={{
                    fontWeight: 700,
                    fontSize: "1rem"
                }}
            >
                {title}
            </h2>
        </header>
    );
}