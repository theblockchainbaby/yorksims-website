import { describe, it, expect } from "vitest";
import {
  generateLlcAgreement,
  generateLlcAgreementHtml,
  type LlcAgreementInput,
} from "../../app/lib/llc-template";

const singleMember: LlcAgreementInput = {
  entityName: "Acme Holdings LLC",
  state: "Wyoming",
  formationDate: "2026-01-15",
  principalOffice: "123 Main St, Casper, WY 82601",
  purpose: "software development and consulting",
  memberStructure: "single",
  managementStructure: "member-managed",
  members: [{ name: "York Sims", contribution: 10000, ownershipPct: 100 }],
};

const multiMember: LlcAgreementInput = {
  entityName: "Dual Ventures LLC",
  state: "Delaware",
  formationDate: "2026-02-01",
  principalOffice: "100 Market St, Wilmington, DE 19801",
  purpose: "multi-channel payment infrastructure",
  memberStructure: "multi",
  managementStructure: "manager-managed",
  members: [
    { name: "York Sims", contribution: 15000, ownershipPct: 60 },
    { name: "Jane Doe", contribution: 10000, ownershipPct: 40 },
  ],
};

describe("generateLlcAgreement", () => {
  it("includes the entity name in the title", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).toContain("ACME HOLDINGS LLC");
  });

  it("includes the state of formation", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).toContain("State of Wyoming");
  });

  it("includes a legal disclaimer", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).toContain("not legal advice");
    expect(doc).toContain("licensed attorney");
  });

  it("single-member version uses 'Sole Member' language", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).toContain("Sole Member");
  });

  it("multi-member version lists every member by name", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("York Sims");
    expect(doc).toContain("Jane Doe");
  });

  it("multi-member version includes buy-sell / transfer restrictions", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("Restrictions on Transfer");
    expect(doc).toContain("Right of First Refusal");
  });

  it("single-member version is taxed as disregarded entity", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).toContain("disregarded entity");
  });

  it("multi-member version is taxed as partnership", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("partnership for federal income tax purposes");
  });

  it("manager-managed version references 'Manager'", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("Management Vested in Manager");
  });

  it("member-managed version does not mention Manager Vested", () => {
    const doc = generateLlcAgreement(singleMember);
    expect(doc).not.toContain("Management Vested in Manager");
  });

  it("total capital contributions match the sum of members", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("$25,000"); // 15k + 10k
  });

  it("includes the purpose verbatim", () => {
    const doc = generateLlcAgreement(multiMember);
    expect(doc).toContain("multi-channel payment infrastructure");
  });

  it("includes a signature block for each member", () => {
    const doc = generateLlcAgreement(multiMember);
    const matches = doc.match(/____________________________________/g);
    expect(matches?.length).toBeGreaterThanOrEqual(2);
  });
});

describe("generateLlcAgreementHtml", () => {
  it("produces a valid HTML document", () => {
    const html = generateLlcAgreementHtml(singleMember);
    expect(html).toContain("<!doctype html>");
    expect(html).toContain("</html>");
  });

  it("escapes angle brackets in the content", () => {
    const html = generateLlcAgreementHtml({
      ...singleMember,
      purpose: "<script>alert(1)</script>",
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes a print bar for browser PDF export", () => {
    const html = generateLlcAgreementHtml(singleMember);
    expect(html).toContain("window.print()");
  });

  it("sets the entity name in the title tag", () => {
    const html = generateLlcAgreementHtml(singleMember);
    expect(html).toContain("<title>Operating Agreement — Acme Holdings LLC</title>");
  });
});
