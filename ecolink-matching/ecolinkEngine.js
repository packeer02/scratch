/**
 * EcoLink AI Mentor Matching Engine
 * 
 * Calculates compatibility between a Startup and an array of Mentors
 * based on specific weighted criteria and generates simulated AI reasoning.
 */

class EcoLinkMatcher {
  /**
   * Weights (Total 100)
   * Expertise overlap: 35
   * Industry match: 25
   * Stage compatibility: 15
   * Geography/Language: 15 (7.5 geo + 7.5 lang)
   * Past performance: 10
   */

  static matchMentors(startup, mentors) {
    const results = mentors.map(mentor => {
      let score = 0;
      let breakdown = { expertise: 0, industry: 0, stage: 0, geoLang: 0, past: 0 };
      let reasoningPoints = [];

      // 1. Expertise Overlap (0-35)
      const reqExpertise = startup.requiredExpertise || [];
      const mentorExpertise = mentor.expertise || [];
      let matchCount = 0;
      let matchedExpertise = [];
      
      reqExpertise.forEach(req => {
        if (mentorExpertise.includes(req)) {
          matchCount++;
          matchedExpertise.push(req);
        }
      });
      
      const expScore = reqExpertise.length > 0 ? (matchCount / reqExpertise.length) * 35 : 35;
      score += expScore;
      breakdown.expertise = expScore;

      if (matchCount > 0) {
        reasoningPoints.push(`has strong expertise in ${matchedExpertise.join(' and ')}`);
      } else {
        reasoningPoints.push(`lacks the specific expertise required`);
      }

      // 2. Industry Match (0-25)
      if (mentor.industry === startup.industry) {
        score += 25;
        breakdown.industry = 25;
        reasoningPoints.push(`operates in the same ${startup.industry} industry`);
      }

      // 3. Stage Compatibility (0-15)
      if (mentor.stagePreference.includes(startup.stage)) {
        score += 15;
        breakdown.stage = 15;
        reasoningPoints.push(`has experience guiding startups at the ${startup.stage} stage`);
      }

      // 4. Geography/Language (0-15)
      let geoLangScore = 0;
      if (mentor.location === startup.location) {
        geoLangScore += 7.5;
        reasoningPoints.push(`is based locally in ${startup.location}`);
      }
      if (mentor.language === startup.languagePreference) {
        geoLangScore += 7.5;
      }
      score += geoLangScore;
      breakdown.geoLang = geoLangScore;

      // 5. Past Performance (0-10)
      const pastScore = (mentor.historicalScore / 10) * 10;
      score += pastScore;
      breakdown.past = pastScore;
      
      if (mentor.historicalScore >= 8.5) {
        reasoningPoints.push(`maintains an excellent historical mentorship rating (${mentor.historicalScore}/10)`);
      }

      // Construct AI Reasoning Simulation
      let reasoning = "";
      if (score > 80) {
        reasoning = `${mentor.name} is an excellent fit (scored ${Math.round(score)}%) because they ${reasoningPoints.slice(0,3).join(', and ')}.`;
      } else if (score > 50) {
        reasoning = `${mentor.name} is a moderate match (scored ${Math.round(score)}%). They ${reasoningPoints[0]}, but may not align perfectly on other metrics.`;
      } else {
        reasoning = `${mentor.name} scored ${Math.round(score)}% due to limited overlap with the startup's core requirements.`;
      }

      return {
        mentorId: mentor.id,
        name: mentor.name,
        matchScore: Math.round(score),
        breakdown: breakdown,
        reasoning: reasoning
      };
    });

    // Sort by match score descending
    return results.sort((a, b) => b.matchScore - a.matchScore);
  }
}
