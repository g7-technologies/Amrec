import React, { Component } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import { Foundation,AntDesign} from '@expo/vector-icons'; 

import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default class PrivacyPolicy extends Component {
    static navigationOptions = {
        title:'Privacy Policy',
        drawerIcon: ({ tintColor }) => (
            <Foundation
            name="clipboard-notes" size={20}
            style={{ color: tintColor }}
            />
        )  
    };

    render(){
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={{flex:1}}>
                    <View style={{flex:0.1,padding:5}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                            <AntDesign name="arrowleft" color={'#fff'}  size={25}  />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontSize:20}}>Privacy</Text>
                    </View>
                    <View style={{flex:1,padding:10}}>
                            {/*Heading*/}
                            <Text style={{fontSize:20}}> Privacy Policy (as of January, 30th, 2018)</Text>
                            <Text style={{color:'#fff',textAlign:'justify'}}>
                                AMREC and its subsidiaries are committed to protecting your privacy. The following statement explains the steps we take to protect personal data collected on our websites. It describes what categories of personal data we collect, the purposes for which we use those data, your choices regarding use of personal data about you, our security measures, and how you can review and correct data about you. By accessing our websites, you consent to the data collection and use practices described in this privacy statement.
                            </Text>
                                 {/*Heading*/}
                            <Text style={{fontSize:20}}>Data collection</Text>
                            <Text style={{color:'#fff',textAlign:'justify'}}>
                            The personal data we collected may include:
                            Contact details, such as your: name, title, company/organization name, email address, telephone and fax numbers, and physical address.
                            Information about your company and job position.
                            Your preferences with respect to email marketing.
                            Financial information, including credit card numbers, bank or customer account information and, in connection with credit requests, Social Security Number or other national/tax identification number.
                            Information such as your nationality and country of residence that allows us to determine your eligibility under export control regulations to receive information about certain technologies.
                            Your inquiries about and orders for our products and services, as well as information that assists us in identifying the best products and services for you.
                            Contest entry and event registration information.
                            Feedback from you about our products and services, including our websites.
                            You are not required to provide this information. However, if you choose not to, we may not be able to provide you the requested service or complete your transaction.

                            Data collected by automated means. We collect certain data about all visitors to our websites, including what pages they view, the number of bytes transferred, the links they click, and other actions taken within our websites. On websites to which you log on, we may connect this information with your identity to determine your potential interests in our products and services. We may also use this information to improve our security measures. We also collect certain standard information that your browser sends to every website you visit, such as your Internet Protocol (IP) address, your browser type and capabilities and language, your operating system, the date and time you access the site, and the website from which you linked to our site.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Use of personal data</Text>
                            <Text style={{color:'#fff',textAlign:'justify'}}>
                            TWe will use personal data only for the purposes set forth below.

                            Services and transactions. We use personal data to deliver services or execute transactions you request, such as providing information about AMREC products and services, processing orders, answering customer service requests, facilitating use of our websites, and so forth. In order to offer you a more consistent experience in interacting with AMREC, information collected by our websites may be combined with information we collect by other means.

                            Website improvement. We may use data about you to improve our websites (including our security measures) and related products or services, or to make our websites easier to use by eliminating the need for you to repeatedly enter the same information, or by customizing our websites to your particular preference or interests.

                            Marketing Communications. With your permission, we may use personal data to inform you of products or services available from AMREC. When collecting information that might be used to contact you about our products and services, we give you the opportunity to opt-out from receiving such communications. Moreover, each email communication we send includes an unsubscribe link allowing you to stop delivery of that type of communication. If you elect to unsubscribe, we will remove you from the relevant list within 15 business days.

                            Employment Applications. In connection with a job application or inquiry, you may provide us with data about yourself, including your educational background, résumé or curriculum vitae, and other information, including your ethnicity where required or permitted by law. We may use this information throughout AMREC, its subsidiaries and affiliates, and its joint ventures for the purpose of employment consideration. We will keep the information for future consideration unless you direct us not to do so.
                            </Text>
                                 {/*Heading*/}
                            <Text style={{fontSize:20}}>Use of cookies and web beacons</Text>
                            <Text style={{color:'#fff',textAlign:'justify'}}>
                            Cookies are small files that websites save to your hard disk or to your browser’s memory. Our websites may use them to track the number of times you have visited the website, to track the number of visitors to the website, to determine and analyze visitors’ use of our websites, to store data that you provide (such as your preferences), and to store technical information related to your interactions with our websites. We may also use session cookies, which are deleted when you close your browser, to store your user ID, to facilitate your movement around our websites (particularly in connection with information searches and order placement) and other information useful in administering the session.

                            Our sites also may contain electronic images known as Web beacons—sometimes called single-pixel gifs—that allow us to count the number of users who have visited those pages. We may include Web beacons in promotional email messages or newsletters in order to determine whether messages have been opened and acted upon, including whether the recipient clicked on a link in the email or forwarded the email to another person.

                            Adjusting Browser Settings to Manage Cookies or Send “Do Not Track” Signals: Most Internet browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies or to notify you when a cookie is being placed on your computer. If you choose not to accept cookies, you may not be able to experience all of the features of our websites. Internet browsers also enable you to delete existing cookies, although this means that your existing settings (including stored user IDs and other preferences) will be lost. Some web browsers may also give you the ability to enable a “do not track” setting. This setting sends a signal to the websites you encounter while web browsing. This “do not track” signal is different from disabling certain forms of tracking by declining cookies in your browser settings, as browsers with the “do not track” setting enabled may still accept cookies. AMREC does not respond to web browser “do not track” signals at this time. If we do so in the future, we will describe how we do so in this Privacy Statement.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Disclosure of personal data</Text>
                            <Text style={{color:'#fff',textAlign:'justify'}}>
                            Except as described below, personal data that you provide to AMREC via our websites will not be shared outside of AMREC, its subsidiaries and affiliates and its joint ventures without your consent.

                            Disclosure to service providers. AMREC contracts with other companies to provide services on our behalf, such as hosting websites, sending out information, processing transactions, and analyzing our websites. We provide these companies with only those elements of personal data they need to deliver those services. These companies and their employees are prohibited from using those personal data for any other purposes.

                            Disclosure in connection with transactions. In connection with certain transactions, we may disclose some or all of the personal data you provide to financial institutions, government entities and shipping companies or postal services involved in fulfilling the transaction.

                            Disclosures in connection with acquisitions or divestitures. Circumstances may arise where for strategic or other business reasons AMREC decides to sell, buy, merge or otherwise reorganize particular businesses. Such a transaction may involve the disclosure of personal data to prospective or actual purchasers, or receiving it from sellers. Although it is AMREC’s practice to seek protection for information in these types of transactions, we cannot guarantee that any entity receiving such data from AMREC in connection with one of these transactions will comply with all of the terms of this privacy statement.

                            Disclosure on collaborative websites. Some of our websites promote collaboration among registered users with respect to a particular area or topic. On those websites, we may share your username with other participants to label comments or suggestions that you make as yours. We do not, however, share your name, contact details, or other personal data with other users of those collaborative websites.

                            Disclosure for other reasons. We may disclose personal data if required to do so by law or in the good-faith belief that such action is necessary to comply with legal requirements or with legal process served on us, to protect and defend our rights or property, or in urgent circumstances to protect the personal safety of any individual.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Security</Text>
                            <Text style={{textAlign:'justify'}}>
                            AMREC is committed to protecting the security of personal data. While no security measure can guarantee against compromise, we use a variety of security technologies and procedures to help protect data from unauthorized access, use, or disclosure. For example, we store the personal data you provide on computer systems with limited access that are located in facilities to which access is limited. When you move around a site to which you have logged in, or from one site to another that uses the same login mechanism, we verify your identity by means of an encrypted cookie placed on your machine. When you place an order with us, view account information, or provide financial information, we protect the transmission of such data using Secure Socket Layer (SSL) encryption.

                            For sites to which you log in, it is your responsibility to ensure the security of your password and to not reveal this information to others. If you are sharing a computer with anyone, you should always log out before leaving a website so that subsequent users will not be able to access your data.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Reviewing personal data</Text>
                            <Text style={{textAlign:'justify'}}>
                            In some cases, you can review and correct personal data provided through our websites by going to the page on which you provided the data. You can also make a request to review and correct personal data collected via our websites or submit any inquiries or concerns you may have regarding personal data by contacting us.

                            To the extent required by law, we provide users with (i) reasonable access to the personal information they provide through the Sites, and (ii) the ability to review, correct and delete such personal information. To help protect your privacy, we take reasonable steps to verify your identity before granting access to your information. You can help us to keep data about you accurate by notifying us of any change to your mailing address, phone number or email address.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>International transfers of personal data</Text>
                            <Text style={{textAlign:'justify'}}>
                                Personal data collected on our websites may be stored and processed in the United States or any other country in which AMREC or its subsidiaries, affiliates or joint ventures maintain facilities, including countries which may not have data protection laws similar to the laws in the country from which you initially provided the information. By choosing to use our websites and to provide data to them, you consent to any such transfer of information outside of your country.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Links to other websites</Text>
                            <Text style={{textAlign:'justify'}}>
                            Our websites may contain links to other websites, including those of other companies, professional and government organizations, and publications. These websites operate independently from our Sites, and we do not control and are not responsible for the content, security or privacy practices employed by other websites. You should review the privacy statements of those websites to determine how they protect and use personal data.

                            Children
                            This site is a general audience site, although it contains information that may be of interest to children. However, AMREC does not seek through this site to gather personal data from or about persons 14 years or younger. If one of our websites is directed at children, we will include an additional privacy statement notice for children.
                            </Text>
                             {/*Heading*/}
                            <Text style={{fontSize:20}}>Questions about our privacy practices</Text>
                            <Text style={{textAlign:'justify'}}>
                            If you have questions regarding this privacy statement or our handling of personal data, please contact us at LINK FORM PRIVACY.

                            Changes to this privacy statement
                            AMREC may occasionally update this privacy statement. When we do, we will revise the “effective” date at the top of the privacy statement. You should revisit this page periodically to become aware of the most recent privacy terms; your use of the site after such changes have been posted constitutes your agreement to such changes.

                            </Text>
                        </View>
                                                
                </LinearGradient>
            </ScrollView>
        )
    }
}
