"""Generate RSE Associates website proposal PDF for MegaAutomation."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
)
from reportlab.lib import colors

OUTPUT_PATH = r"D:\CursorProject\RSE-Associates\RSE-Associates-Website-Proposal-2026.06.22.pdf"

PAGE_W, _PAGE_H = letter
MARGIN = 0.75 * inch


def build_styles():
    base = getSampleStyleSheet()
    return {
        "letterhead": ParagraphStyle(
            "Letterhead",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=12,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10.5,
            leading=13,
            alignment=TA_LEFT,
            spaceAfter=6,
        ),
        "body_tight": ParagraphStyle(
            "BodyTight",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10.5,
            leading=13,
            alignment=TA_LEFT,
            spaceAfter=2,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=10.5,
            leading=13,
            alignment=TA_LEFT,
            spaceBefore=7,
            spaceAfter=3,
        ),
        "subsection": ParagraphStyle(
            "Subsection",
            parent=base["Normal"],
            fontName="Times-Bold",
            fontSize=10.5,
            leading=13,
            alignment=TA_LEFT,
            spaceBefore=4,
            spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Times-Roman",
            fontSize=10.5,
            leading=12.5,
            alignment=TA_LEFT,
            leftIndent=22,
            bulletIndent=10,
            spaceAfter=1,
        ),
    }


def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.grey)
    canvas.drawCentredString(PAGE_W / 2, 0.5 * inch, f"Page {doc.page}")
    canvas.restoreState()


def bullet(text, styles):
    return Paragraph(text, styles["bullet"], bulletText="\u2022")


def signature_block(styles):
    left = [
        Paragraph("Yours truly,", styles["body_tight"]),
        Spacer(1, 0.35 * inch),
        Paragraph("Maria Levin", styles["body_tight"]),
        Paragraph("MegaAutomation", styles["body_tight"]),
    ]
    right = [
        Paragraph("Accepted and approved by:", styles["body_tight"]),
        Spacer(1, 0.35 * inch),
        Paragraph("____________________________________", styles["body_tight"]),
        Paragraph("Sofya Auren", styles["body_tight"]),
        Paragraph(
            "Signed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date",
            styles["body_tight"],
        ),
    ]

    table = Table([[left, right]], colWidths=[3.25 * inch, 3.25 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def build_pdf():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
    )

    story = []

    story.append(
        Paragraph(
            "megaautomation.ai &nbsp;|&nbsp; maria@megaautomationsai.com",
            styles["letterhead"],
        )
    )
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("June 22, 2026", styles["body_tight"]))
    story.append(Spacer(1, 0.08 * inch))

    for line in [
        "Sofya Auren",
        "RSE Associates, Inc.",
        "63 Pleasant Street",
        "Watertown, MA 02472",
    ]:
        story.append(Paragraph(line, styles["body_tight"]))
    story.append(Spacer(1, 0.08 * inch))

    story.append(
        Paragraph(
            "<b>Re:</b> RSE Associates Website Design and Implementation<br/>"
            "&nbsp;&nbsp;&nbsp;&nbsp;www.rseassociates.com",
            styles["body_tight"],
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph("Dear Sofya,", styles["body_tight"]))
    story.append(Spacer(1, 0.04 * inch))
    story.append(
        Paragraph(
            "We are pleased to submit the following fee proposal to provide website design, "
            "setup, and implementation services for the above referenced project.",
            styles["body"],
        )
    )

    story.append(Paragraph("1. Project Description", styles["section"]))
    story.append(
        Paragraph(
            "The project consists of the design, development, and launch of a custom marketing "
            "website for RSE Associates, Inc. The new site will replace the existing Wix website "
            "and present the firm\u2019s award-winning portfolio, services, and leadership to "
            "architects, institutions, and developers. The website will be built on a modern, "
            "production-grade platform optimized for performance, search engine visibility, and "
            "long-term maintainability.",
            styles["body"],
        )
    )

    story.append(Paragraph("2. Scope of Work", styles["section"]))
    story.append(
        Paragraph(
            "Work will be delivered in two phases:",
            styles["body_tight"],
        )
    )

    story.append(Paragraph("Phase 1 \u2014 Initial Training and Requirements Gathering", styles["subsection"]))
    for item in [
        "Stakeholder kickoff and orientation to the new website platform.",
        "Requirements gathering: content priorities, branding, sitemap, and launch goals.",
        "Training session for the RSE team member who will manage the site going forward.",
        "Documented requirements and agreed project plan for Phase 2.",
    ]:
        story.append(bullet(item, styles))

    story.append(
        Paragraph(
            "Phase 2 \u2014 Website Configuration and Migration",
            styles["subsection"],
        )
    )
    for item in [
        "Website configuration, content setup, and migration from the existing Wix site.",
        "Production hosting and deployment configuration (Vercel CDN, HTTPS).",
        "DNS migration and go-live at rseassociates.com.",
        "Source code handoff via GitHub repository with deployment documentation.",
        "Five (5) hours of post-migration support within 30 days of go-live for copy "
        "revisions, minor layout adjustments, content updates, and launch troubleshooting.",
    ]:
        story.append(bullet(item, styles))

    story.append(Paragraph("3. Fees", styles["section"]))
    story.append(
        Paragraph(
            "For the scope of work above, we propose the following fees:",
            styles["body_tight"],
        )
    )
    story.append(Spacer(1, 0.06 * inch))
    for line in [
        "Standard project fee: $5,000",
        "Friends &amp; Family discount (50%): -$2,500",
        "<b>Total fee: $2,500</b>",
    ]:
        story.append(Paragraph(line, styles["body_tight"]))
    story.append(Spacer(1, 0.04 * inch))
    story.append(Paragraph("Phase fees:", styles["body_tight"]))
    for line in [
        "Phase 1 \u2014 Initial training and requirements gathering: $500",
        "Phase 2 \u2014 Website configuration and migration (includes 5 hours "
        "post-migration support): $2,000",
    ]:
        story.append(Paragraph(line, styles["body_tight"]))

    story.append(Paragraph("4. Schedule", styles["section"]))
    for item in [
        "Phase 1 \u2014 initial training and requirements gathering",
        "Phase 2 \u2014 website configuration, migration, and go-live",
    ]:
        story.append(bullet(item, styles))

    story.append(Paragraph("5. Expenses", styles["section"]))
    story.append(PageBreak())

    story.append(bullet("Expenses are included in the fees above.", styles))

    story.append(Paragraph("6. Terms", styles["section"]))
    for item in [
        "Phase 1 and Phase 2 fees are due at the conclusion of the project.",
        "Client to provide final copy, project photography, and DNS/registrar access.",
        "Client owns all deliverables upon final payment.",
        "This proposal is valid for 60 days.",
    ]:
        story.append(bullet(item, styles))

    story.append(Spacer(1, 0.25 * inch))
    story.append(signature_block(styles))

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"Saved to {OUTPUT_PATH}")


if __name__ == "__main__":
    build_pdf()
