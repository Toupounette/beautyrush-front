import React from 'react';
import {
    IonContent,
    IonPage,
    IonTitle,
    IonImg,
    IonThumbnail
} from '@ionic/react';

import BeautyHeader from '../components/BeautyHeader';


class PrivacyPolicy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
		<IonPage>
			<BeautyHeader/>
				<IonContent>
					<IonImg width="50" height="50" class="logo" src='assets/img/logo512wobg.png' />
						<p>Politique de confidentialité</p>
						<p>ARTICLE 1 – RENSEIGNEMENTS PERSONNELS RECUEILLIS</p>
						<p>Lorsque vous utilisez notre application, nous recueillons les renseignements personnels que vous nous fournissez, tels que votre nom, votre adresse et votre adresse e-mail.
Avec votre permission, nous pourrions vous envoyer des e-mails.
</p>
						<p>ARTICLE 2 - CONSENTEMENT</p>
						<p>Comment obtenez-vous mon consentement ?</p>
						<p>Lorsque vous nous fournissez vos renseignements personnels pour la création de votre compte, nous présumons que vous consentez à ce que nous recueillions vos renseignements et à ce que nous les utilisions à cette fin uniquement.
Si nous vous demandons de nous fournir vos renseignements personnels pour une autre raison, à des fins de marketing par exemple, nous vous demanderons directement votre consentement explicite, ou nous vous donnerons la possibilité de refuser.
</p>
						<p>Comment puis-je retirer mon consentement ?</p>
						<p>Si après nous avoir donné votre consentement, vous changez d’avis et ne consentez plus à ce que nous puissions vous contacter, recueillir vos renseignements ou les divulguer, vous pouvez nous en aviser en nous contactant à contactbeautyrushapp@gmail.com ou par courrier à : Beauty Rush 12 rue de Gouverneur, 75003, Paris France</p>
						<p>ARTICLE 3 – DIVULGATION</p>
						<p>Nous pouvons divulguer vos renseignements personnels si la loi nous oblige à le faire ou si vous violez nos Conditions Générales de Vente et d’Utilisation.</p>
						<p>ARTICLE 4 – SÉCURITÉ</p>
						<p>Pour protéger vos données personnelles, nous prenons des précautions raisonnables et suivons les meilleures pratiques de l’industrie pour nous assurer qu’elles ne soient pas perdues, détournées, consultées, divulguées, modifiées ou détruites de manière inappropriée.</p>
						<p>ARTICLE 5 – ÂGE DE CONSENTEMENT</p>
						<p>En utilisant ce site, vous déclarez que vous avez au moins l’âge de la majorité dans votre État ou province de résidence, et que vous nous avez donné votre consentement pour permettre à toute personne d’âge mineur à votre charge d’utiliser ce site web.</p>
						<p>ARTICLE 6 – MODIFICATIONS APPORTÉES À LA PRÉSENTE POLITIQUE DE CONFIDENTIALITÉ</p>
						<p>Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment, donc veuillez s’il vous plait la consulter fréquemment. Les changements et les clarifications prendront effet immédiatement après leur publication sur le site web. Si nous apportons des changements au contenu de cette politique, nous vous aviserons ici qu’elle a été mise à jour, pour que vous sachiez quels renseignements nous recueillons, la manière dont nous les utilisons, et dans quelles circonstances nous les divulguons, s’il y a lieu de le faire.
Si Beauty Rush fait l’objet d’une acquisition par ou d’une fusion avec une autre entreprise, vos renseignements pourraient être transférés aux nouveaux propriétaires pour que nous puissions continuer à vous vendre des services.
</p>
						<p>QUESTIONS ET COORDONNÉES</p>
						<p>Si vous souhaitez: accéder à, corriger, modifier ou supprimer toute information personnelle que nous avons à votre sujet, déposer une plainte, ou si vous souhaitez simplement avoir plus d’informations, contactez notre agent responsable des normes de confidentialité à contactbeautyrushapp@gmail.com ou par courrier à : Beauty Rush 12 rue de Gouverneur, 75003, Paris France</p>
					
				</IonContent>
		</IonPage>
        );
    }
}

export default PrivacyPolicy;
