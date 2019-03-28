(function () {
    'use strict';

    define(['service/config', 'model/model', 'amplify'], function (config, model) {


        var service = {
            newItem: newItem,
            getQuoteData: getQuoteData
        };

        function init() {

        }

        function newItem(options) {
            return new model.ModelQuote(options);
        }

        function getQuoteData() {

            var models = [];
                models.push(this.newItem({quote: 'Our ability to reach unity in diversity will be the beauty and the test of our civilisation.', author: 'Mahatma Gandhi'}));
                models.push(this.newItem({quote: 'All the diversity, all the charm, and all the beauty of life are made up of light and shade.', author: 'Leo Tolstoy, Anna Karenin'}));
                models.push(this.newItem({quote: 'Recognize yourself in he and she who are not like you and me.', author: 'Carlos Fuentes'}));
                models.push(this.newItem({quote: 'The only difference between you and the person you admire is their perspective on life.', author: 'Shannon L. Alder'}));
                models.push(this.newItem({quote: 'We are all the same and we are all different. What great friends we will be.', author: 'Kelly Moran'}));
                models.push(this.newItem({quote: 'Diversity creates dimension in the world.', author: 'Elizabeth Ann Lawless'}));
                models.push(this.newItem({quote: 'Amazing how eye and skin colour come in many shades yet many think sexuality is just gay or straight.', author: 'DaShanne Stokes'}));
                models.push(this.newItem({quote: 'So far there\'ll always be some thrive for perfection, there should be no shame in imperfection.', author: 'Aniekee Tochukwu'}));
                models.push(this.newItem({quote: 'Diversity cannot swim in a world flooding with clones.', author: 'Hiba Fatima Ahmad'}));
                models.push(this.newItem({quote: 'Channeled correctly and integrated properly, our diversity can be our greatest strength.', author: 'Max DePree'}));
                models.push(this.newItem({quote: 'Look what we\'ve done so far. We\'re pretty good at the impossible.', author: 'Richelle Mead, Soundless'}));
                models.push(this.newItem({quote: 'The acknowledgement of a single possibility can change everything.', author: 'Aberjhani, Splendid Literarium'}));
                models.push(this.newItem({quote: 'The strength of every individual is the grace for great work.', author: 'Lailah Gifty Akita, Think Great: Be Great!'}));
                models.push(this.newItem({quote: 'Without empathy, there\'d be no harmony in diversity.', author: 'Jennifer Tindugan-Adoviso'}));
                models.push(this.newItem({quote: 'Cultural heritage define the uniqueness of individuals. Appreciate cultural diversity.', author: 'Lailah Gifty Akita, Think Great: Be Great!'}));
                models.push(this.newItem({quote: 'When we respect our humanity, we can embrace our diversity.', author: 'Liza M. Wiemer'}));
            return models;
        }

        init();

        return service;

    });

})();