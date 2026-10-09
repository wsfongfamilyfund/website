"use client";

import React, { useState } from "react";
import Link from "next/link";

const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedU8RpEYYjugZnRKQciIW36PSWW7ibA6RD-ySXaDjCWrY2HA/formResponse";

type RoleType = "" | "nonprofit" | "family";

export default function ApplyPage() {
  const [role, setRole] = useState<RoleType>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Family Member Nomination state
  const [famOrgName, setFamOrgName] = useState("");
  const [famContactInfo, setFamContactInfo] = useState("");
  const [famReason, setFamReason] = useState("");

  // Non-Profit Grant Application state
  const [npLegalName, setNpLegalName] = useState("");
  const [npCharityStatus, setNpCharityStatus] = useState(
    "Yes, we are a registered US 501(c)(3) public charity"
  );
  const [npEin, setNpEin] = useState("");
  const [npContactName, setNpContactName] = useState("");
  const [npContactEmail, setNpContactEmail] = useState("");
  const [npWebsite, setNpWebsite] = useState("");
  const [npMission, setNpMission] = useState("");
  const [npGrantAmount, setNpGrantAmount] = useState("");
  const [npProgramDesc, setNpProgramDesc] = useState("");
  const [npCharityNav990, setNpCharityNav990] = useState("");
  const [npFamilyReferrer, setNpFamilyReferrer] = useState("");
  const [npHearAboutUs, setNpHearAboutUs] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append("fvv", "1");

      if (role === "family") {
        formData.append(
          "entry.1541549540",
          "I am a W.S. Fong Family Member nominating an organization"
        );
        formData.append("entry.87261942", famOrgName.trim());
        formData.append("entry.1154654565", famContactInfo.trim());
        if (famReason.trim()) {
          formData.append("entry.1955807405", famReason.trim());
        }
        formData.append("pageHistory", "0,2");
      } else if (role === "nonprofit") {
        formData.append(
          "entry.1541549540",
          "I am applying on behalf of a 501(c)(3) non-profit organization"
        );
        formData.append("entry.1169953432", npLegalName.trim());
        formData.append("entry.699397320", npCharityStatus);
        formData.append("entry.650184770", npEin.trim());
        formData.append("entry.332892884", npContactName.trim());
        formData.append("entry.614394387", npContactEmail.trim());
        if (npWebsite.trim()) {
          formData.append("entry.883641863", npWebsite.trim());
        }
        if (npMission.trim()) {
          formData.append("entry.1254832719", npMission.trim());
        }
        formData.append("entry.630859756", npGrantAmount.trim());
        formData.append("entry.1613015835", npProgramDesc.trim());
        formData.append("entry.1089095067", npCharityNav990.trim());
        if (npFamilyReferrer.trim()) {
          formData.append("entry.1164483795", npFamilyReferrer.trim());
        }
        // In the multi-section Google Form, "How Did You Hear About Us?" carries
        // the goToAction=SUBMIT_FORM branch at the end of Section 2. Defaulting to "Other"
        // when left blank ensures Section 2 always submits cleanly without requiring Section 3.
        formData.append(
          "entry.1456430453",
          npHearAboutUs.trim() || "Other"
        );
        formData.append("pageHistory", "0,1");
      }

      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        "There was an issue submitting your form. Please try again or email us directly at hello@wsfongfamilyfund.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#2D3E2F] font-sans py-12 md:py-20 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#2D3E2F]/80 hover:text-[#2D3E2F] transition"
          >
            <span aria-hidden="true">&larr;</span> Back to W.S. Fong Family Fund
          </Link>
        </div>

        {/* Page Header & Description */}
        <header className="mb-10 border-b border-[#8FA89B]/30 pb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D3E2F] mb-5 font-normal tracking-wide">
            W.S. Fong Family Fund &mdash; 2027 Grant Application
          </h1>

          <div className="space-y-4 text-[#2D3E2F]/90 text-base md:text-lg leading-relaxed">
            <p>
              The W.S. Fong Family Fund supports charitable organizations making
              a meaningful, lasting impact. For the 2027 grant cycle, we are
              awarding grants (ranging from{" "}
              <span className="font-medium text-[#2D3E2F]">
                $10,000 to $100,000
              </span>
              ) to charities focused on:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>
                <strong className="font-medium text-[#2D3E2F]">
                  Education:
                </strong>{" "}
                Literacy, tutoring, academic enrichment, and youth empowerment
              </li>
              <li>
                <strong className="font-medium text-[#2D3E2F]">
                  Vocation:
                </strong>{" "}
                Job training, vocational skills, career mentorship, and economic
                self-sufficiency
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm md:text-base text-[#2D3E2F]/85">
              <p>
                <strong className="font-medium text-[#2D3E2F]">
                  Application Deadline:
                </strong>{" "}
                Jan 31, 2027
              </p>
              <p>
                <strong className="font-medium text-[#2D3E2F]">
                  Questions?
                </strong>{" "}
                Contact us at{" "}
                <a
                  href="mailto:hello@wsfongfamilyfund.com"
                  className="underline decoration-[#8FA89B] underline-offset-4 hover:text-[#374738]"
                >
                  hello@wsfongfamilyfund.com
                </a>
              </p>
            </div>
          </div>
        </header>

        {/* Confirmation View */}
        {isSubmitted ? (
          <div className="bg-white/80 border border-[#8FA89B]/40 rounded-2xl p-8 md:p-10 shadow-sm text-center space-y-6">
            <div className="mx-auto w-14 h-14 rounded-full bg-[#374738]/10 text-[#374738] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-[#2D3E2F]">
              {role === "family"
                ? "Thank You for Your Nomination!"
                : "Thank You for Applying!"}
            </h2>

            <p className="text-[#2D3E2F]/85 max-w-xl mx-auto leading-relaxed">
              {role === "family"
                ? "Your nomination has been recorded for the 2027 W.S. Fong Family Fund grant cycle. Our committee will review your nomination and follow up with the organization."
                : "Your grant application has been received by the W.S. Fong Family Fund committee. If you would also like to share your latest IRS Form 990 as a PDF attachment, please email it to hello@wsfongfamilyfund.com."}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-base font-medium text-[#F5F5F0] bg-[#374738] rounded-lg shadow-md hover:bg-[#4A5D4B] transition duration-200"
              >
                Return to Homepage
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setRole("");
                }}
                className="inline-flex items-center justify-center px-6 py-3 font-sans text-base font-medium text-[#2D3E2F] bg-transparent border-2 border-[#2D3E2F] rounded-lg hover:bg-[#2D3E2F]/10 transition duration-200"
              >
                Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Role Selection */}
            <section className="bg-white/75 border border-[#8FA89B]/35 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
              <div>
                <label className="block font-serif text-xl md:text-2xl text-[#2D3E2F] mb-1">
                  Who is completing this form?{" "}
                  <span className="text-[#D4AF37]" aria-hidden="true">
                    *
                  </span>
                </label>
                <p className="text-sm text-[#2D3E2F]/75">
                  Please select whether you are a W.S. Fong family member
                  submitting a nomination, or a representative applying on
                  behalf of a 501(c)(3) non-profit organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    role === "nonprofit"
                      ? "border-[#374738] bg-[#374738]/5 ring-1 ring-[#374738]"
                      : "border-[#8FA89B]/40 bg-[#F5F5F0]/60 hover:border-[#8FA89B]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="nonprofit"
                    checked={role === "nonprofit"}
                    onChange={() => setRole("nonprofit")}
                    className="mt-1 h-4 w-4 accent-[#374738]"
                    required
                  />
                  <div>
                    <span className="block font-medium text-[#2D3E2F]">
                      I am applying on behalf of a 501(c)(3) non-profit
                      organization
                    </span>
                    <span className="block text-xs text-[#2D3E2F]/70 mt-1">
                      Complete the full 2027 grant application ($10,000 &ndash;
                      $100,000)
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                    role === "family"
                      ? "border-[#374738] bg-[#374738]/5 ring-1 ring-[#374738]"
                      : "border-[#8FA89B]/40 bg-[#F5F5F0]/60 hover:border-[#8FA89B]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="family"
                    checked={role === "family"}
                    onChange={() => setRole("family")}
                    className="mt-1 h-4 w-4 accent-[#374738]"
                    required
                  />
                  <div>
                    <span className="block font-medium text-[#2D3E2F]">
                      I am a W.S. Fong Family Member nominating an organization
                    </span>
                    <span className="block text-xs text-[#2D3E2F]/70 mt-1">
                      Quick 3-question nomination form for family members
                    </span>
                  </div>
                </label>
              </div>
            </section>

            {/* Path A: Family Member Nomination */}
            {role === "family" && (
              <section className="bg-white/75 border border-[#8FA89B]/35 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="border-b border-[#8FA89B]/25 pb-4">
                  <h2 className="font-serif text-2xl text-[#2D3E2F]">
                    Family Member Nomination
                  </h2>
                  <p className="text-sm text-[#2D3E2F]/75 mt-1">
                    Thank you for nominating an organization for the 2027 W.S.
                    Fong Family Fund! You only need to fill out the 3 quick
                    fields below, and our committee will follow up with the
                    organization.
                  </p>
                </div>

                {/* 1. Organization Name */}
                <div>
                  <label
                    htmlFor="famOrgName"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Organization Name{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Name of the 501(c)(3) non-profit organization you are
                    nominating (and their website URL, if known).
                  </p>
                  <input
                    id="famOrgName"
                    type="text"
                    required
                    value={famOrgName}
                    onChange={(e) => setFamOrgName(e.target.value)}
                    placeholder="e.g., Homeboy Industries (https://homeboyindustries.org)"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 2. Contact Info */}
                <div>
                  <label
                    htmlFor="famContactInfo"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Contact Info{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Organization&apos;s contact person, email address, phone
                    number, or website
                  </p>
                  <input
                    id="famContactInfo"
                    type="text"
                    required
                    value={famContactInfo}
                    onChange={(e) => setFamContactInfo(e.target.value)}
                    placeholder="e.g., Jane Doe (jane@charity.org) — Nominated by [Your Name]"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 3. Why are you nominating this organization? */}
                <div>
                  <label
                    htmlFor="famReason"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Why are you nominating this organization?
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Share why you care about this organization and how their
                    work connects to our family values or themes (Education &amp;
                    Vocation).
                  </p>
                  <textarea
                    id="famReason"
                    rows={4}
                    value={famReason}
                    onChange={(e) => setFamReason(e.target.value)}
                    placeholder="Share a brief note on why you are nominating this organization..."
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>
              </section>
            )}

            {/* Path B: 501(c)(3) Non-Profit Grant Application */}
            {role === "nonprofit" && (
              <section className="bg-white/75 border border-[#8FA89B]/35 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="border-b border-[#8FA89B]/25 pb-4">
                  <h2 className="font-serif text-2xl text-[#2D3E2F]">
                    501(c)(3) Non-Profit Grant Application
                  </h2>
                  <p className="text-sm text-[#2D3E2F]/75 mt-1">
                    Please complete the following application for the 2027 W.S.
                    Fong Family Fund Grant Cycle ($10,000 &ndash; $100,000
                    grants). Applications close January 31, 2027.
                  </p>
                </div>

                {/* 1. Organization Legal Name */}
                <div>
                  <label
                    htmlFor="npLegalName"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Organization Legal Name{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Official legal name as registered with the IRS (must be a US
                    501(c)(3) public charity).
                  </p>
                  <input
                    id="npLegalName"
                    type="text"
                    required
                    value={npLegalName}
                    onChange={(e) => setNpLegalName(e.target.value)}
                    placeholder="Official 501(c)(3) Organization Name"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 2. 501(c)(3) Public Charity Status */}
                <div>
                  <label className="block text-sm font-medium text-[#2D3E2F] mb-1">
                    501(c)(3) Public Charity Status{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Grants from the W.S. Fong Family Fund are distributed via a
                    Donor-Advised Fund (DAF) and require active IRS 501(c)(3)
                    public charity status.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Yes, we are a registered US 501(c)(3) public charity",
                      "Yes, we operate under a qualified 501(c)(3) fiscal sponsor",
                      "No / Other",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 text-sm text-[#2D3E2F] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="npCharityStatus"
                          value={option}
                          checked={npCharityStatus === option}
                          onChange={() => setNpCharityStatus(option)}
                          required
                          className="h-4 w-4 accent-[#374738]"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. EIN / Tax ID Number */}
                <div>
                  <label
                    htmlFor="npEin"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    EIN / Tax ID Number{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    9-digit IRS Employer Identification Number (XX-XXXXXXX). If
                    operating under a fiscal sponsor, please include both the
                    fiscal sponsor EIN and legal name.
                  </p>
                  <input
                    id="npEin"
                    type="text"
                    required
                    value={npEin}
                    onChange={(e) => setNpEin(e.target.value)}
                    placeholder="XX-XXXXXXX"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 4. Primary Contact Name & 5. Primary Contact Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="npContactName"
                      className="block text-sm font-medium text-[#2D3E2F] mb-1"
                    >
                      Primary Contact Name{" "}
                      <span className="text-[#D4AF37]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <p className="text-xs text-[#2D3E2F]/70 mb-2">
                      Full name of the primary contact person for this
                      application (e.g., Jane Doe).
                    </p>
                    <input
                      id="npContactName"
                      type="text"
                      required
                      value={npContactName}
                      onChange={(e) => setNpContactName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="npContactEmail"
                      className="block text-sm font-medium text-[#2D3E2F] mb-1"
                    >
                      Primary Contact Email Address{" "}
                      <span className="text-[#D4AF37]" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <p className="text-xs text-[#2D3E2F]/70 mb-2">
                      Direct email address for application updates and committee
                      follow-up.
                    </p>
                    <input
                      id="npContactEmail"
                      type="email"
                      required
                      value={npContactEmail}
                      onChange={(e) => setNpContactEmail(e.target.value)}
                      placeholder="jane@organization.org"
                      className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                    />
                  </div>
                </div>

                {/* 6. Organization Website */}
                <div>
                  <label
                    htmlFor="npWebsite"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Organization Website
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Primary website URL
                  </p>
                  <input
                    id="npWebsite"
                    type="text"
                    value={npWebsite}
                    onChange={(e) => setNpWebsite(e.target.value)}
                    placeholder="https://www.organization.org"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 7. Organization Mission Statement */}
                <div>
                  <label
                    htmlFor="npMission"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Organization Mission Statement
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Briefly share your organization&apos;s core mission,
                    history, and the primary community or population you serve.
                  </p>
                  <textarea
                    id="npMission"
                    rows={3}
                    value={npMission}
                    onChange={(e) => setNpMission(e.target.value)}
                    placeholder="Share your organization's mission statement..."
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 8. Grant Request Amount ($ USD) */}
                <div>
                  <label
                    htmlFor="npGrantAmount"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Grant Request Amount ($ USD){" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Enter a dollar amount between $10,000 and $100,000 (e.g.,
                    $25,000).
                  </p>
                  <input
                    id="npGrantAmount"
                    type="text"
                    required
                    value={npGrantAmount}
                    onChange={(e) => setNpGrantAmount(e.target.value)}
                    placeholder="$25,000"
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 9. Program Description */}
                <div>
                  <label
                    htmlFor="npProgramDesc"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Program Description{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Please describe: (1) how the requested grant funds will be
                    used, (2) the outcomes you expect over the next 12 months
                  </p>
                  <textarea
                    id="npProgramDesc"
                    rows={5}
                    required
                    value={npProgramDesc}
                    onChange={(e) => setNpProgramDesc(e.target.value)}
                    placeholder="Describe your program goals, how the grant funds will be used, and expected 12-month outcomes..."
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 10. Charity Navigator Rating / Profile Link & IRS Form 990 Link */}
                <div>
                  <label
                    htmlFor="npCharityNav990"
                    className="block text-sm font-medium text-[#2D3E2F] mb-1"
                  >
                    Charity Navigator Rating / Profile Link &amp; IRS Form 990
                    Link{" "}
                    <span className="text-[#D4AF37]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <p className="text-xs text-[#2D3E2F]/70 mb-2">
                    Please share a link to your Charity Navigator (or
                    Candid/GuideStar) profile, a link to your latest IRS Form
                    990, and your approximate Program Expense Ratio %
                    (percentage of total expenses dedicated directly to
                    programs; target &gt;= 80%). You may also email your Form
                    990 PDF directly to hello@wsfongfamilyfund.com.
                  </p>
                  <textarea
                    id="npCharityNav990"
                    rows={3}
                    required
                    value={npCharityNav990}
                    onChange={(e) => setNpCharityNav990(e.target.value)}
                    placeholder="Charity Navigator / Candid link, Form 990 URL, and Program Expense Ratio %..."
                    className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                  />
                </div>

                {/* 11. Family Referrer Name (Optional) & 12. How Did You Hear About Us? */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="npFamilyReferrer"
                      className="block text-sm font-medium text-[#2D3E2F] mb-1"
                    >
                      Family Referrer Name (Optional)
                    </label>
                    <p className="text-xs text-[#2D3E2F]/70 mb-2">
                      If a W.S. Fong family member invited or encouraged your
                      organization to apply, please list their name here so our
                      committee knows you are connected!
                    </p>
                    <input
                      id="npFamilyReferrer"
                      type="text"
                      value={npFamilyReferrer}
                      onChange={(e) => setNpFamilyReferrer(e.target.value)}
                      placeholder="Family member name (if applicable)"
                      className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] placeholder:text-[#2D3E2F]/40 focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="npHearAboutUs"
                      className="block text-sm font-medium text-[#2D3E2F] mb-1"
                    >
                      How Did You Hear About Us?
                    </label>
                    <p className="text-xs text-[#2D3E2F]/70 mb-2">
                      Please select how you learned about the W.S. Fong Family
                      Fund grant cycle.
                    </p>
                    <select
                      id="npHearAboutUs"
                      value={npHearAboutUs}
                      onChange={(e) => setNpHearAboutUs(e.target.value)}
                      className="w-full rounded-lg border border-[#8FA89B]/50 bg-[#F5F5F0]/50 px-4 py-2.5 text-[#2D3E2F] focus:border-[#374738] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#374738]"
                    >
                      <option value="">Select an option (optional)</option>
                      <option value="Family Nomination">
                        Family Nomination
                      </option>
                      <option value="Direct Invitation Email">
                        Direct Invitation Email
                      </option>
                      <option value="Grapevine / PhilanthropyTogether">
                        Grapevine / PhilanthropyTogether
                      </option>
                      <option value="Web Search">Web Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

            {submitError && (
              <div className="rounded-xl border border-red-400 bg-red-50 p-4 text-sm text-red-800">
                {submitError}
              </div>
            )}

            {role !== "" && (
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-8 py-3.5 min-h-12 font-sans text-base font-medium text-[#F5F5F0] bg-[#374738] rounded-lg shadow-md hover:bg-[#4A5D4B] disabled:opacity-50 transition duration-200"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : role === "family"
                    ? "Submit Family Nomination"
                    : "Submit Grant Application"}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
