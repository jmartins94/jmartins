// Netlify Function: Fetch stock data from a public Google Sheets CSV
// The sheet should have columns: Produto, Tamanho, Estoque (e.g., "Sneaker Grafite", "38", "3")
// Set the GOOGLE_SHEET_CSV_URL environment variable to the published CSV URL of your Google Sheet
// To get the URL: Google Sheets > File > Share > Publish to web > CSV format

export default async (req) => {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (!sheetUrl) {
    // Return demo data when no sheet is configured
    return Response.json({
      source: "demo",
      message: "Configure GOOGLE_SHEET_CSV_URL para conectar sua planilha.",
      produtos: {
        "Sneaker Grafite": {
          "36": 2, "37": 2, "38": 2, "39": 2, "40": 2, "41": 2, "42": 2, "43": 2
        },
        "Sneaker Preto": {
          "36": 2, "37": 1, "38": 2, "39": 2, "40": 1, "41": 2, "42": 1, "43": 0
        }
      }
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=30"
      }
    });
  }

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Sheet fetch failed: ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.trim().split("\n");

    if (lines.length < 2) {
      return Response.json({ error: "Planilha vazia ou formato inválido." }, { status: 400 });
    }

    // Parse CSV: expected columns — Produto, Tamanho, Estoque
    const produtos = {};
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map(c => c.trim().replace(/^"|"$/g, ""));
      if (cols.length >= 3) {
        const produto = cols[0];
        const tamanho = cols[1];
        const estoque = parseInt(cols[2], 10) || 0;

        if (!produtos[produto]) {
          produtos[produto] = {};
        }
        produtos[produto][tamanho] = estoque;
      }
    }

    return Response.json({
      source: "sheets",
      produtos
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=30"
      }
    });
  } catch (error) {
    return Response.json({
      error: "Erro ao buscar dados da planilha.",
      details: error.message
    }, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};
