var DEFAULT_LIFE = 5;
var life = DEFAULT_LIFE;
var background_var = 0;
var curr_scenario = {};
var quests = [];

function newgame() {
	hideMainMenu();
	showLevel();
	showHearts();
	showOptionPage();
	showOptionButton();
	hideOutcomePage();
	hideContinue();
	hideGameOver();
	quests = [];

	resetHearts();
	nextlevel();
}

function mainMenu() {
	showMainMenu();
	hideLevel();
	hideHearts();
	hideLevel();
	hideOptionPage();
	hideOptionButton();
	hideOutcomePage();
	hideContinue();
	hideGameOver();
	quests = [];
}

function nextlevel() {
	if (life <= 0) {
		gameover();
		return;
	}

	var levelselect = Math.floor(Math.random() * leveleasy.length);

	var single_quest_check = true;
	while (single_quest_check) {
		var roll_again = quests.findIndex((e) => {
			if (e.includes(leveleasy[levelselect].scenario)) {
				nextlevel();
				return true;
			}
		});

		if (roll_again >= 0) {
			console.log('duplicate ' + levelselect);
			levelselect = Math.floor(Math.random() * leveleasy.length);
		} else {
			single_quest_check = false;
		}
	}

	hearts();
	curr_scenario = leveleasy[levelselect];

	document.getElementById('level').style.backgroundImage = 'url("./images/' + bg_var[0] + '")';
	var situationselect = Math.floor(Math.random() * curr_scenario.situation.length);
	document.getElementById('levelsituation').innerHTML = curr_scenario.situation[situationselect];
	document.getElementById('levelimage').innerHTML = `<img src="./images/` + curr_scenario.image + `" />`;
	document.getElementById('levelopt1').innerText = curr_scenario.opt1;
	document.getElementById('levelopt2').innerText = curr_scenario.opt2;
	showOptionPage();
	showOptionButton();
	hideOutcomePage();
	hideContinue();
}

function selectoption(opt_chosen) {
	var rng = Math.floor(Math.random() * 100);
	var opt_outcome = opt_chosen == 1 ? curr_scenario.opt1_outcome : curr_scenario.opt2_outcome;
	var rng_outcome = {};
	for (let i = 0; i < opt_outcome.length; i++) {
		rng -= opt_outcome[i].chance;
		if (rng <= 0) {
			rng_outcome = opt_outcome[i];
			break;
		}
	}
	hideOptionPage();
	hideOptionButton();
	showOutcomePage();
	showContinue();
	document.getElementById('leveloutcome').innerHTML = rng_outcome.text;
	document.getElementById('levelimageoutcome').innerHTML = `<img src="./images/` + rng_outcome.image + `" />`;
	life -= rng_outcome.damage;
	hearts();

	if (curr_scenario.scenario.includes('pr_pumpkin')) {
		// console.log(rng_outcome.id);
		quests.push(rng_outcome.id);
	}
}

function gameover() {
	showGameOver();
	hideLevel();
	hideHearts();
	hideOutcomePage();
}

/// ---------------------------------------------------------------------------------------------------------------------

function resetHearts() {
	life = DEFAULT_LIFE;
}

function showMainMenu() {
	document.getElementById('page1').style.display = '';
}

function hideMainMenu() {
	document.getElementById('page1').style.display = 'none';
}

function showLevel() {
	document.getElementById('level').style.display = '';
}

function hideLevel() {
	document.getElementById('level').style.display = 'none';
}

function showGameOver() {
	document.getElementById('gameover').style.display = '';
}

function hideGameOver() {
	document.getElementById('gameover').style.display = 'none';
}

function showHearts() {
	document.getElementById('life').style.display = '';
}

function hideHearts() {
	document.getElementById('life').style.display = 'none';
}

function showOptionButton() {
	document.getElementById('two_choice_time').style.display = '';
}

function hideOptionButton() {
	document.getElementById('two_choice_time').style.display = 'none';
}

function showContinue() {
	document.getElementById('progress_outcome_time').style.display = '';
}

function hideContinue() {
	document.getElementById('progress_outcome_time').style.display = 'none';
}

function showOptionPage() {
	document.getElementById('choosing_time').style.display = '';
}

function hideOptionPage() {
	document.getElementById('choosing_time').style.display = 'none';
}

function showOutcomePage() {
	document.getElementById('outcome_time').style.display = '';
}

function hideOutcomePage() {
	document.getElementById('outcome_time').style.display = 'none';
}

function hearts() {
	let sum = '';
	for (let i = 0; i < life; i++) {
		sum += '♥️';
	}
	document.getElementById('life').innerText = sum;
}

function getLevel(scenario) {
	for (let i = 0; i < leveleasy.length; i++) {
		if (scenario == leveleasy[i].scenario) {
			return leveleasy[i];
		}
	}
	return null;
}

/// ---------------------------------------------------------------------------------------------------------------------

var bg_var = [ 'bg_river.png' ];

var leveleasy = [
	{
		scenario: 'ov_onion',
		situation: [ 'An overrated Onion stands in your way... Menacingly...' ],
		image: 'ov_onion.png',
		opt1: 'Confront',
		opt2: 'Walk away',
		opt1_outcome: [
			{
				chance: 20,
				text:
					'Apparently he was just trying to sell some onion rings. You happily bought one and go on your merry ways!',
				damage: 0,
				image: 'ov_onion/onion_ring.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'Apparently he was just trying to sell some onion based dessert. You both walked your separate paths.',
				damage: 0,
				image: 'ov_onion/pie.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You stares back at him. He did not give chase and walked away... Menacingly...',
				damage: 0,
				image: 'ov_onion/looking.png',
				id: ''
			},
			{
				chance: 15,
				text: 'You stares back at him. Overrated Onion looked away shyly...',
				damage: 0,
				image: 'ov_onion/blush.png',
				id: ''
			},
			{
				chance: 10,
				text: 'You stares back at him. He chased after you but you got away.',
				damage: 0,
				image: 'ov_onion/chase.png',
				id: ''
			},
			{
				chance: 15,
				text:
					'You stares back at him, and you blinked. Overrated Onion won the staring contest, and you were hurt in the shame of losing.',
				damage: 1,
				image: 'ov_onion/trophy.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 70,
				text: 'Overrated Onion continues to stare at you... Menacingly...',
				damage: 0,
				image: 'ov_onion.png',
				id: ''
			},
			{
				chance: 25,
				text: 'He gave you a chase, but eventually letting you go... Menacingly...',
				damage: 0,
				image: 'ov_onion/chase.png',
				id: ''
			},
			{
				chance: 5,
				text: 'He continously stares at you, menacingly... You wont be sleeping soundly tonight...',
				damage: 1,
				image: 'ov_onion/menacing.png',
				id: ''
			}
		]
	},
	{
		scenario: 'pr_paprika',
		situation: [ 'Princess Paprika is crying for help T.T' ],
		image: 'pr_paprika.png',
		opt1: 'Help her',
		opt2: 'Run away',
		opt1_outcome: [
			{
				chance: 15,
				text: 'Thank you brave leaf! May the wind of strength carry your ways!',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 15,
				text: 'Such kind and gentle soul! May the wind of wisdom guide your path!',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 15,
				text:
					'Thank you kind stranger! You saved Princess Paprika in her distress. May the sun, moon, and stars lit your path!',
				damage: 0,
				image: 'pr_paprika/with_soldier1.png',
				id: ''
			},
			{
				chance: 15,
				text: 'Thank you mighty tree! May you be abundant and bear much fruits!',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 10,
				text: "You fool! You fell for the generic damnsel in distress trope! Get 'em!",
				damage: 1,
				image: 'pr_paprika/angry_bandit2.png',
				id: ''
			},
			{
				chance: 10,
				text: "Thank you for... Being such a fool! Get 'em!",
				damage: 1,
				image: 'pr_paprika/angry_bandit1.png',
				id: ''
			},
			{
				chance: 20,
				text: "You fool! You fell for the oldest trick in the book! Get 'em!",
				damage: 1,
				image: 'pr_paprika/angry.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 20,
				text: 'You left Paprika Princess on her own. So mean! >:(',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You left Paprika Princess on her own. Now she got bitten by a rabbit! >:(',
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You left Paprika Princess on her own. Now she got pecked by a chicken! >:(',
				damage: 0,
				image: 'pr_paprika/chicken.png',
				id: ''
			},
			{
				chance: 15,
				text: 'You left Paprika Princess on her own. Now she got attacked by bandits! >:(',
				damage: 0,
				image: 'pr_paprika/angry_bandit3.png',
				id: ''
			},
			{
				chance: 15,
				text:
					'You left Paprika Princess on her own. Her bodyguard came back to protect her now. You are not part of the equation.',
				damage: 0,
				image: 'pr_paprika/with_soldier1.png',
				id: ''
			},
			{
				chance: 10,
				text: 'You left Paprika Princess on her own. But nothing happened...',
				damage: 0,
				image: 'pr_paprika.png',
				id: ''
			}
		]
	},
	{
		scenario: 'pr_pumpkin',
		situation: [ 'Prophetic Pumpkin tells you a fortune.' ],
		image: 'pr_paprika.png',
		opt1: 'Listen',
		opt2: "Don't listen",
		opt1_outcome: [
			{
				chance: 50,
				text: 'A great wind is blowing. Seek out the shelter. Follow the light of the sun',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: 'pr_pumpkin_omen_sun'
			},
			{
				chance: 50,
				text: 'A great wind is blowing. Seek out the shelter. Follow the light of the stars',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: 'pr_pumpkin_omen_stars'
			}
		],
		opt2_outcome: [
			{
				chance: 50,
				text: `You walked away from the Prophetic Pumpkin. You faintly hears his prophecy: "A great wind is <span style="font-size:20px">bl</span><span style="font-size:16px">ow</span><span style="font-size:12px">in</span><span style="font-size:8px">g............</span>"`,
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: 'pr_pumpkin_omen_sun_ignore'
			},
			{
				chance: 50,
				text: `You walked away from the Prophetic Pumpkin. You faintly hears his prophecy: "A great wind is <span style="font-size:20px">bl</span><span style="font-size:16px">ow</span><span style="font-size:12px">in</span><span style="font-size:8px">g............</span>"`,
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: 'pr_pumpkin_omen_stars_ignore'
			}
		]
	},
	{
		scenario: 'ph_pormagrenate',
		situation: [
			'Phony Pormagrenate tells you that the left path is safe.<br><span style="font-size:16px">But something feels strange about him...</span>'
		],
		image: 'pr_paprika.png',
		opt1: 'Go Left',
		opt2: 'Go Right',
		opt1_outcome: [
			{
				chance: 40,
				text: 'You took the left path and it is safe! I guess he is telling the truth.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 60,
				text: 'You took the left path and it is dangerous! I guess he is a phony after all.',
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 10,
				text:
					'You took the right path and it is safe! You shouted at him that he is not a vegetable. Phony Pormegranate felt that.',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 50,
				text: 'You took the right path and it is safe! I guess he is a phony after all.',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 40,
				text: 'You took the right path and it is dangerous! I guess he might be telling some truths after all.',
				damage: 1,
				image: 'pr_paprika/rabbit.png',
				id: ''
			}
		]
	},
	{
		scenario: 'ab_apple',
		situation: [ 'Abusive Apple starts to insult you for no reason.' ],
		image: 'pr_paprika.png',
		opt1: 'Insult Back',
		opt2: 'Ignore',
		opt1_outcome: [
			{
				chance: 20,
				text: 'He started to get into a fight with you. But you came out victorious. Abusive Apple apologised.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'He started to get into a fight with you. Both of you got into a stalemate. Abusive Apple walks away.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'He started to get into a fight with you. Abusive Apple came out victorious. And you are badly injured.',
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 30,
				text:
					'Abusive Apple started crying. Turns out he is Awkward Apple the whole time! Are you happy now? >:(',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 10,
				text:
					'Abusive Apple started crying. Turns out he is Awkward Apple the whole time! He received emotional damage. :(',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 40,
				text: "Abusive Apple felt sad. He was apparently an Awkward Apple. He doesn't know how to socialise",
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You walked away, taking all the insults like a chad.',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You walked away, taking all the insults. But Abusive Apple dealt you emotional damage.',
				damage: 1,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You walked away, taking all the insults. You felt nothing.',
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			}
		]
	},
	{
		scenario: 'kn_kale',
		situation: [ 'Knowledgable Kale is trying to tell you something.' ],
		image: 'pr_paprika.png',
		opt1: 'Listen',
		opt2: 'Ignore',
		opt1_outcome: [
			{
				chance: 20,
				text: 'You are filled with knowledge. But you quickly forgot everything. Just as always.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You have no idea what he is talking about. "Me neither", he said.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 10,
				text: 'You are filled with knowledge. But nothing is related to what you need to know.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 10,
				text: 'You are filled with knowledge. You are now capable to solve your Math homework.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 10,
				text: `You are filled with knowledge. But you understood that "you" actually didn't gain any knowledge.`,
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text: `You are filled with knowledge. But you dozed off and Knowledgable Kale felt offended >:( Minus points for Gingerdor`,
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 40,
				text: 'Knowledgable Kale felt sad. He do.',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 30,
				text: 'Knowledgable Kale felt sad. How cruel are you? :(',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 30,
				text: 'Cmon. Let him share his passion too... Look, he is all sad now :(',
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			}
		]
	},
	{
		scenario: 'cl_cauliflower',
		situation: [
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Vegetable puns make me feel good from my head tomatoes."</span>',
			`<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"I buy my veggiefriends vegetables every weekend; they think I'm corny."</span>`,
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"We lost our friend when we went to the field for a walk; if you see him, lettuce know."</span>',
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Just turned down a job at my local vegetable shop; the celery was unacceptable."</span>',
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Why are mushrooms always invited to parties? Because they are such fungis."</span>',
			`<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Why shouldn't you tell secrets to the beans? Because the beans-talk."</span>`,
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"What do you call a table that you can eat? A vegetable."</span>',
			'<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"What vegetable do chickens grow? Eggplants."</span>',
			`<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"What kind of flower shouldn't be put in a vase? Cauliflower."</span>`,
			`<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Which martial art are vegetables good at? Carrotee."</span>`,
			`<span style="font-size: 20px">Clowny Cauliflower wants to tell you a joke :D<br>"Why is it impossible to get angry with a yam? Because they're such sweet potatoes."</span>`
		],
		image: 'pr_paprika.png',
		opt1: 'Laugh',
		opt2: '"Laugh"',
		opt1_outcome: [
			{
				chance: 80,
				text: 'You laugh at his joke. Clowny Cornflower laughs together with you :D',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You laugh at his joke. I hope that you genuinely found them funny, lol.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 70,
				text: 'You "laugh" at his joke. Clowny Cornflower laughs together with you :D',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text: 'You "laugh" at his joke. Clowny Cornflower noticed your fake laugh (0. 0)',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 10,
				text:
					'You "laugh" at his joke. Clowny Cornflower knows you are faking it! He cries and that made you felt bad.',
				damage: 1,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			}
		]
	},
	{
		scenario: 'kf_kohlrabi',
		situation: [ 'Kung Fu Kohlrabi challenges you for a fight!' ],
		image: 'pr_paprika.png',
		opt1: 'Fight!',
		opt2: 'Refuse',
		opt1_outcome: [
			{
				chance: 20,
				text:
					'You fought using knowledge you learned from YamTube about self-defense. You fought and beet Kung Fu Kohlrabi.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text: `You fought using knowledge you learned from YamTube about self-defense. But that's not how real life works.`,
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'With teachings by Sergeant Dill from Beetroid Self-defense, you fought and disarmed Kung Fu Kohlrabi like in the tutorial.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'With teachings by Sergeant Dill from Beetroid Self-defense, you fought and unfortunately disarmed by Kung Fu Kohlrabi. Not like the simulation.',
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			},
			{
				chance: 20,
				text: 'With no experience in martial arts, you are basically destroyed by Kung Fu Kohlrabi.',
				damage: 1,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 20,
				text: 'Kung Fu Kohlrabi picked a fight anyways, but the Pea-lice intercepted right on time!',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 15,
				text:
					'You just walked away and wondered. "What is Kohlrabi anyways?" Strange named vegetable, am I right?',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text: `Kung Fu Kohlrabi blocked your way and hit you for trying to pass through. It hurts :'(`,
				damage: 1,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 20,
				text: `Kung Fu Kohlrabi picked a fight anyways, and you got hit. It hurts :'(`,
				damage: 1,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 8,
				text: `You reasoned with Kung Fu Kohlrabi and explained about futility of life. Kung Fu Kohlrabi gave up and questioned about his existent.`,
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 8,
				text: `You reasoned with Kung Fu Kohlrabi and explained about purpose of life. Kung Fu Kohlrabi gave up and questioned about his purpose.`,
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			},
			{
				chance: 9,
				text: `You reasoned with Kung Fu Kohlrabi and explained about life and death. Kung Fu Kohlrabi gave up and questioned about his life decisions.`,
				damage: 0,
				image: 'pr_paprika/rabbit.png',
				id: ''
			}
		]
	},
	{
		scenario: 'wi_wormwood',
		situation: [ 'Fourth-Wall Fenugreek asking you to press a button.' ],
		image: 'pr_paprika.png',
		opt1: 'Press!',
		opt2: 'Press?',
		opt1_outcome: [
			{
				chance: 20,
				text:
					'You fought using knowledge you learned from YamTube about self-defense. You fought and beet Kung Fu Kohlrabi.',
				damage: 0,
				image: 'pr_paprika/teary_eye.png',
				id: ''
			}
		],
		opt2_outcome: [
			{
				chance: 20,
				text: 'Fourth-Wall Fenugreek knows that you like to press this button. But he lets you go this time.',
				damage: 0,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			},
			{
				chance: 20,
				text:
					'Fourth-Wall Fenugreek knows that you like to press this button. So urm... You lose a health, I guess?',
				damage: 1,
				image: 'pr_paprika/teary_eye_left.png',
				id: ''
			}
		]
	}
	// ,
	// {
	// 	scenario: 'fw_fenugreek',
	// 	situation: [ 'Fourth-Wall Fenugreek asking you to press a button.' ],
	// 	image: 'pr_paprika.png',
	// 	opt1: 'Press!',
	// 	opt2: 'Press?',
	// 	opt1_outcome: [
	// 		{
	// 			chance: 20,
	// 			text:
	// 				'You fought using knowledge you learned from YamTube about self-defense. You fought and beet Kung Fu Kohlrabi.',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye.png',
	// 			id: ''
	// 		}
	// 	],
	// 	opt2_outcome: [
	// 		{
	// 			chance: 20,
	// 			text: 'Fourth-Wall Fenugreek knows that you like to press this button. But he lets you go this time.',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye_left.png',
	// 			id: ''
	// 		},
	// 		{
	// 			chance: 20,
	// 			text:
	// 				'Fourth-Wall Fenugreek knows that you like to press this button. So urm... You lose a health, I guess?',
	// 			damage: 1,
	// 			image: 'pr_paprika/teary_eye_left.png',
	// 			id: ''
	// 		}
	// 	]
	// }
	// ,
	// {
	// 	situation: ['Electric Eggplant egg-static-ally appeared! He asks you to help him.'],
	// 	image: 'el_eggplant.png',
	// 	opt1: 'Help him',
	// 	opt2: 'Refuse',
	// 	opt1_outcome: [
	// 		{
	// 			chance: 15,
	// 			text: 'Thank you brave leaf! May the wind of strength carry your ways!',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye.png'
	// 		},
	// 		{
	// 			chance: 15,
	// 			text: 'Such kind and gentle soul! May the wind of wisdom guide your path!',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye.png'
	// 		},
	// 		{
	// 			chance: 15,
	// 			text:
	// 				'Thank you kind stranger! You saved Princess Paprika in her distress. May the sun, moon, and stars lit your path!',
	// 			damage: 0,
	// 			image: 'pr_paprika/with_soldier1.png'
	// 		},
	// 		{
	// 			chance: 15,
	// 			text: 'Thank you mighty tree! May you be abundant and bear much fruits!',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye.png'
	// 		},
	// 		{
	// 			chance: 10,
	// 			text: "You fool! You fell for the generic damnsel in distress trope! Get 'em!",
	// 			damage: 1,
	// 			image: 'pr_paprika/angry_bandit2.png'
	// 		},
	// 		{
	// 			chance: 10,
	// 			text: "Thank you for... Being such a fool! Get 'em!",
	// 			damage: 1,
	// 			image: 'pr_paprika/angry_bandit1.png'
	// 		},
	// 		{
	// 			chance: 20,
	// 			text: "You fool! You fell for the oldest trick in the book! Get 'em!",
	// 			damage: 1,
	// 			image: 'pr_paprika/angry.png'
	// 		}
	// 	],
	// 	opt2_outcome: [
	// 		{
	// 			chance: 20,
	// 			text: 'You left Paprika Princess on her own. So mean! >:(',
	// 			damage: 0,
	// 			image: 'pr_paprika/teary_eye_left.png'
	// 		},
	// 		{
	// 			chance: 20,
	// 			text: 'You left Paprika Princess on her own. Now she got bitten by a rabbit! >:(',
	// 			damage: 0,
	// 			image: 'pr_paprika/rabbit.png'
	// 		},
	// 		{
	// 			chance: 20,
	// 			text: 'You left Paprika Princess on her own. Now she got pecked by a chicken! >:(',
	// 			damage: 0,
	// 			image: 'pr_paprika/chicken.png'
	// 		},
	// 		{
	// 			chance: 15,
	// 			text: 'You left Paprika Princess on her own. Now she got attacked by bandits! >:(',
	// 			damage: 0,
	// 			image: 'pr_paprika/angry_bandit3.png'
	// 		},
	// 		{
	// 			chance: 15,
	// 			text:
	// 				'You left Paprika Princess on her own. Her bodyguard came back to protect her now. You are not part of the equation.',
	// 			damage: 0,
	// 			image: 'pr_paprika/with_soldier1.png'
	// 		},
	// 		{
	// 			chance: 10,
	// 			text: 'You left Paprika Princess on her own. But nothing happened...',
	// 			damage: 0,
	// 			image: 'pr_paprika.png'
	// 		}
	// 	]
	// }
];
