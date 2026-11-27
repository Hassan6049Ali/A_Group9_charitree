/**
 * Charitree Support Module - Structured Datasets
 * Used across Eligibility Guide, Request Help, and Track Support Request.
 */

const CHARITREE_DATA = {
  storageKeys: {
    eligibilityDraft: "charitree_eligibility_draft",
    checklistState: "charitree_eligibility_checklist",
    requestDraft: "charitree_request_draft",
    supportRequests: "charitree_support_requests"
  },

  programs: [
    {
      id: "prog-medical",
      category: "Medical",
      title: "Emergency Medical & Treatment Aid",
      maxCapPkr: 100000,
      perCapitaLimitPkr: 16000,
      turnaround: "2–4 Business Days",
      summary:
        "Covers urgent surgeries, diagnostic scans, chronic medication, and maternal care for uninsured families.",
      requiredDocs: [
        "Valid applicant CNIC (front & back)",
        "Hospital cost estimate or doctor prescription",
        "Household income statement or utility bill"
      ]
    },
    {
      id: "prog-education",
      category: "Education",
      title: "Student Fee & Learning Stipend",
      maxCapPkr: 60000,
      perCapitaLimitPkr: 18000,
      turnaround: "5–7 Business Days",
      summary:
        "Supports school/university tuition fees, exam registration, and textbooks for students facing financial hardship.",
      requiredDocs: [
        "Student B-Form / CNIC & Guardian CNIC",
        "Official institution fee voucher or enrollment letter",
        "Previous academic transcript"
      ]
    },
    {
      id: "prog-food",
      category: "Food Aid",
      title: "Monthly Family Ration & Nutrition Pack",
      maxCapPkr: 25000,
      perCapitaLimitPkr: 14000,
      turnaround: "24–48 Hours",
      summary:
        "Provides essential monthly staples, infant formula, and emergency food baskets to vulnerable households.",
      requiredDocs: [
        "Applicant CNIC",
        "Household dependent count declaration",
        "Local union council or community endorsement (if available)"
      ]
    },
    {
      id: "prog-housing",
      category: "Housing",
      title: "Emergency Shelter & Roof Repair",
      maxCapPkr: 85000,
      perCapitaLimitPkr: 15000,
      turnaround: "4–6 Business Days",
      summary:
        "Assists flood-affected and displaced families with urgent rent support, roof sealing, and basic solar lighting.",
      requiredDocs: [
        "Applicant CNIC",
        "Rent agreement or damage verification photo",
        "Recent electricity/gas bill for address proof"
      ]
    },
    {
      id: "prog-water",
      category: "Clean Water",
      title: "Community Handpump & Water Filtration",
      maxCapPkr: 120000,
      perCapitaLimitPkr: 20000,
      turnaround: "7–10 Business Days",
      summary:
        "Funds solar water filtration units and shared neighborhood handpumps in monsoon-hit or arid settlements.",
      requiredDocs: [
        "Lead coordinator CNIC & 3 neighborhood signatories",
        "Site location details & water quality note",
        "Local vendor installation quote"
      ]
    }
  ],

  checklistItems: [
    {
      id: "chk-medical",
      label: "Medical criteria: Confirmed clinical estimate or prescription is ready (if applying for Medical Aid)."
    },
    {
      id: "chk-education",
      label: "Education criteria: Official school/university fee challan or enrollment proof is attached."
    },
    {
      id: "chk-housing",
      label: "Housing & shelter criteria: Current address utility bill or displacement proof is verified."
    },
    {
      id: "chk-identity",
      label: "Identity & accessibility criteria: Valid CNIC (XXXXX-XXXXXXX-X) and active phone/email are ready."
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "What if I do not have a formal salary slip?",
      answer:
        "Daily-wage earners and self-employed applicants can submit a recent household utility bill along with a brief income declaration. Our field coordinator verifies details during Step 2 (Under Review)."
    },
    {
      id: "faq-2",
      question: "How long does it take to process an urgent medical request?",
      answer:
        "Verified medical emergencies with hospital cost estimates are fast-tracked within 24 to 48 hours so treatment is never delayed."
    },
    {
      id: "faq-3",
      question: "Can I apply for more than one category at the same time?",
      answer:
        "Yes, if your household qualifies, you may submit separate requests—for example, Education fee support and Emergency Food Aid—each receiving its own Tracking ID (CHR-2026-XXX)."
    },
    {
      id: "faq-4",
      question: "How do I check my request status after submitting?",
      answer:
        "Save the Tracking ID shown after submission (format: CHR-2026-884) and enter it with your CNIC on the Track Support Request page to view live progress or upload pending documents."
    }
  ],

  initialRequests: [
    {
      trackingId: "CHR-2026-884",
      fullName: "Bilal Mahmood",
      cnic: "61101-4829103-5",
      category: "Medical",
      amountNeeded: 65000,
      statusStep: 3,
      progressPercent: 75,
      statusLabel: "Approved — Pending Final Document",
      submittedDate: "22 Nov 2026",
      updatedDate: "26 Nov 2026",
      uploadedDocs: ["CNIC_Copy.pdf", "Hospital_Estimate.jpg"],
      notes: "Medical board approved Rs. 65,000. Upload final admission slip to trigger disbursement."
    },
    {
      trackingId: "CHR-2026-512",
      fullName: "Fatima Bibi",
      cnic: "37405-9182736-2",
      category: "Housing",
      amountNeeded: 50000,
      statusStep: 4,
      progressPercent: 100,
      statusLabel: "Funds Disbursed",
      submittedDate: "15 Nov 2026",
      updatedDate: "25 Nov 2026",
      uploadedDocs: ["CNIC_Copy.pdf", "Roof_Damage_Report.pdf"],
      notes: "Disbursement completed via verified bank transfer on 25 Nov 2026."
    },
    {
      trackingId: "CHR-2026-309",
      fullName: "Usman Tariq",
      cnic: "35202-7461928-1",
      category: "Education",
      amountNeeded: 38000,
      statusStep: 2,
      progressPercent: 50,
      statusLabel: "Under Review",
      submittedDate: "24 Nov 2026",
      updatedDate: "27 Nov 2026",
      uploadedDocs: ["Fee_Challan_Fall2026.pdf"],
      notes: "Field team is verifying university fee challan with the accounts office."
    }
  ]
};
