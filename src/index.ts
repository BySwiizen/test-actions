import * as core from "@actions/core";
import * as github from "@actions/github";
import { execSync } from "child_process";

async function run() {
    try {
        core.info("🚀 Exécution de l'action GitHub Shared CI...");

        const token = process.env.GH_ACTION;
        if (!token) {
            throw new Error("❌ GH_ACTION token manquant dans les secrets GitHub.");
        }

        core.info("🔄 Exécution du workflow partagé...");
        execSync("gh workflow run .github/workflows/shared-ci.yml --ref main", { stdio: "inherit" });

        core.info("✅ Workflow exécuté avec succès !");
    } catch (error: any) { // <-- Ajout de ": any" pour corriger l'erreur
        core.setFailed(`❌ Erreur: ${error.message}`);
    }
}

run();