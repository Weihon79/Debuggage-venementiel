import { getMonth } from "../../helpers/Date";

/**Ce fichier est un test unitaire écrit avec Jest (ou un framework similaire).
 *  Il sert à vérifier que la fonction getMonth fonctionne correctement en retournant le bon nom du mois pour une date donnée.
 */

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("returns 'janvier' for 2022-01-01", () => {
            expect(getMonth(new Date("2022-01-01"))).toBe("janvier");
        });
        it("returns 'juillet' for 2022-07-08", () => {
            expect(getMonth(new Date("2022-07-08"))).toBe("juillet");
        });
    });
});
