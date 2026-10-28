"""Comprueba la integración local del sitio sin instalar dependencias."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = {"index.html", "servicios.html", "precios.html", "nosotros.html", "citas.html"}

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.nodes = []
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        self.nodes.append((tag, dict(attrs)))

def main():
    assert {p.name for p in ROOT.glob("*.html")} == PAGES, "Se esperan cinco páginas HTML"
    parsed = {name: Page(ROOT / name) for name in PAGES}
    checked = 0
    for name, page in sorted(parsed.items()):
        ids = [attrs["id"] for _, attrs in page.nodes if "id" in attrs]
        assert len(ids) == len(set(ids)), f"ID duplicado en {name}"
        assert sum(tag == "h1" for tag, _ in page.nodes) == 1, name
        for required in ("header", "nav", "main", "section", "footer", "title"):
            assert any(tag == required for tag, _ in page.nodes), (name, required)
        assert any(tag == "meta" and attrs.get("charset", "").lower() == "utf-8" for tag, attrs in page.nodes), name
        assert any(tag == "meta" and attrs.get("name") == "viewport" for tag, attrs in page.nodes), name
        assert any(tag == "html" and attrs.get("lang") == "es" for tag, attrs in page.nodes), name
        assert sum(attrs.get("aria-current") == "page" for _, attrs in page.nodes) == 1, name
        hrefs = {attrs.get("href") for tag, attrs in page.nodes if tag == "a"}
        assert PAGES <= hrefs, f"Navegación incompleta en {name}"
        for tag, attrs in page.nodes:
            if tag == "img":
                assert "alt" in attrs, f"Falta alt en {name}"
            for described in attrs.get("aria-describedby", "").split():
                assert described in ids, (name, described)
            for key in ("href", "src"):
                if key not in attrs:
                    continue
                url = urlsplit(attrs[key])
                if url.scheme or url.netloc:
                    continue
                target = ROOT / unquote(url.path) if url.path else ROOT / name
                assert target.exists(), f"Recurso inexistente: {name} -> {attrs[key]}"
                if url.fragment and target.suffix == ".html":
                    target_ids = {a.get("id") for _, a in parsed[target.name].nodes}
                    assert url.fragment in target_ids, (name, attrs[key])
                checked += 1
        print(f"OK {name}")
    print(f"OK: 5 páginas, {checked} referencias locales, etiquetas, navegación e identificadores")

if __name__ == "__main__":
    main()
