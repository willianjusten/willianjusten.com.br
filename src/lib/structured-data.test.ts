import { describe, expect, it } from "vitest";
import { buildStructuredData, serializeJsonLd } from "./structured-data";

const copy = {
  title: "Willian Justen | Product Engineer",
  description: "Product Engineer at Spoke.",
};

function nodeOfType(graph: Array<Record<string, unknown>>, type: string) {
  return graph.find((node) => node["@type"] === type);
}

describe("buildStructuredData", () => {
  it("describes the site, the locale's profile page and Will as one linked graph", () => {
    const graph = buildStructuredData("pt", copy)["@graph"] as Array<Record<string, unknown>>;
    const person = nodeOfType(graph, "Person");
    const profilePage = nodeOfType(graph, "ProfilePage");

    expect(nodeOfType(graph, "WebSite")).toMatchObject({ url: "https://willianjusten.com.br" });
    expect(profilePage).toMatchObject({
      url: "https://willianjusten.com.br/pt",
      inLanguage: "pt-BR",
      mainEntity: { "@id": person?.["@id"] },
    });
    expect(person).toMatchObject({
      name: "Willian Justen",
      worksFor: { name: "Spoke" },
      homeLocation: { name: "São Paulo, Brazil" },
    });
  });

  it("lists only real profile links in sameAs, never placeholder homepages", () => {
    const graph = buildStructuredData("en", copy)["@graph"] as Array<Record<string, unknown>>;
    const sameAs = nodeOfType(graph, "Person")?.sameAs;

    expect(sameAs).toContain("https://github.com/willianjusten");
    expect(sameAs).not.toContain("https://www.linkedin.com/");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so the payload cannot close its script tag", () => {
    expect(serializeJsonLd({ text: "</script>" })).toBe('{"text":"\\u003c/script>"}');
  });
});
