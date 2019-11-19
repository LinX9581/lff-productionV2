
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Body, Left, Right, Content, Card, CardItem, Icon } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


var question_history = [
    ["帆布鞋是時下年輕人的鞋子首選，下列何者為帆布鞋開始流行的年代?", "1. 1920年代", "2. 1940年代", "3. 1820年代", "4. 1890年代", "2"],
    ["西裝是現代商業人士必備服飾，然而在18世紀初就誕生了，請問下列何者為當時穿著西裝的由來? ", "1. 結婚", "2. 教師授課", "3. 表演使用", "4. 歐洲皇室聚會", "4"],
    ["1917年7月斐迪南大公被暗殺，開始爆發第一次世界大戰，請問此戰役結束時間為何?", "1. 1918年", "2. 1923年", "3. 1928年", "4. 1933年", "1"],
    ["越南位於東南亞，亞洲四小虎之一，由越南共產黨一黨專制，請問在越戰中擊敗哪個國家並成立越南社會主義共和國?", "1. 英國", "2. 日本", "3. 美國", "4. 中國", "3"],
    ["相傳珍珠奶茶的創始店是春水堂，那麼全台灣第一間春水堂位於何處呢?", "1. 台北市", "2. 台中市", "3. 高雄市", "4. 台南市", "2"],
    ["旗袍為中國古典衣飾，發源地為上海，請問當時是哪個始發群體?", "1. 舞者", "2. 學生", "3. 醫生", "4. 護士", "2"],
    ["韓戰是朝鮮民主主義人民共和國政權與大韓民國政權的戰役，兩邊對稱對朝鮮半島的控制權，然而在1953年簽訂停戰協議，並於哪個位置設為領導邊境?", "1. 北緯38度線", "2. 南緯38度線", "3. 北緯83度線", "4. 南緯83度線", "1"],
    ["2019年為中共建國70周年，於1949年成立中國人民共和國，請問中國共產黨成立於何時?", "1. 1921年", "2. 1931年", "3. 1941年", "4. 1891年", "1"]

]

var question_science=[
    ["下列那一種大氣成分能吸收紫外線?", "1. 氧氣", "2. 氮氣", "3. 臭氧", "4. 氯氣", "3"],
    ["光纖通訊是利用下列那個原理?", "1. 反射", "2. 繞射", "3. 全反射", "4. 干涉", "3"],
    ["下列那一種核融合反應，使星球離開主序帶，形成紅巨星 ?", "1. 氫融合成氦", "2. 氦融合成碳", "3. 碳融合成氧", "4. 氧融合成氖", "2"],
    ["粉筆與豆腐，均含有下列何種礦物?", "1. 石英", "2. 滑石", "3. 石膏", "4. 雲母", "3"],
    ["俗稱電木的材料是", "1. 聚乙烯", "2. 酚甲醛樹脂", "3. 聚苯乙烯", "4. 聚丙烯", "2"],
    ["常在很陡的懸崖底部見到因重力而堆成的堆積物是", "1. 礫岩", "2. 角礫岩", "3. 冰磧岩", "4. 砂岩", "2"],
    ["下列各種電磁波中.何者頻率最高?", "1. 微波", "2. 紅外線", "3. 紫外線", "4. 藍色光", "3"],
    ["引起破傷風的病原菌，其形狀屬於下列那一類?", "1. 球菌", "2. 螺旋菌", "3. 桿菌", "4. 螺旋體", "3"],
    ["下列人類的血管，何者循流的血液為缺氧血", "1. 主動脈", "2. 肺動脈", "3. 肺靜脈", "4. 冠狀動脈", "2"],
    ["下列何元素具有半導體之性質", "1. 碳", "2. 氧", "3. 硼", "4. 矽", "4"]   

]

var question_movie=[
    ["電影復仇者聯盟4在2019年以28億元奪得歷年全球票房冠軍，那麼在這之前的票房冠軍為何?", "1. 鐵達尼號", "2. 復仇者聯盟3", "3. 阿凡達", "4. 侏儸紀世界", "3"],
    ["2008年隨著台灣國片市場的崛起，國片數量開始大增，民眾也越來越支持國片，請問下列哪隻國片票房為歷年最高?", "1. 我的少女時代", "2. KANO", "3. 大尾鱸鰻", "4. 海角七號", "4"],
    ["經典動畫電影獅子王在近年翻拍，奪得史上最高票房動畫片，請問出產該棟襪的動畫公司為下列哪一間?", "1. 華特迪士尼", "2. 夢工廠", "3. 皮克斯", "4. 索尼影業", "1"],
    ["吉卜力工作室是一間日本知名動畫公司，出產了許多經典作品，下列何者不是該動畫公司出產的作品?", "1. 龍貓", "2. 你的名字", "3. 天空之城", "4. 貓的報恩", "2"],
    ["IMBD是個知名影評平台，每年都會票選出十大經典電影，下列哪部電影是常居冠軍位置?", "1. 刺激1995", "2. 復仇者聯盟", "3. 侏儸紀公園", "4. 星際大戰", "1"],
    ["下列何者不是傳統磁帶式錄影機的儲存媒介？", "1. VHS", "2. BetaCAM", "3. HDD", "4. mini DV", "3"],
    ["標準 Full HD 畫質解析度為何？", "1. 720 × 480 像素", "2. 480 × 360 像素", "3. 360 × 1080 像素", "4. 1920 × 1080 像素", "4"],
    ["《玩具總動員》、《蟲蟲危機》、《怪獸電力公司》等膾炙人口的動畫電影，是由哪一家動畫製作公司推出？", "1. 夢工廠", "2. 環球", "3. 華納", "4. 皮克斯", "4"],
    ["1961年哪一個電視台播出第一個電視訊號，從此我國正式邁入電視時代？", "1. 台視", "2. 中視", "3. 華視", "4. 公視", "1"],
    ["關於「蒙太奇」( Montage ) 理論，是製造鏡頭與鏡頭之間的關係，下列何者不屬於此種關係？", "1. 聯想", "2. 衝突", "3. 長短", "4. 對比", "3"]
]

var question_food=[
    ["下列哪種酒類產品的製造過程是採用固態發酵及固態蒸餾方式？", "1. 高粱酒", "2. 米酒", "3. 白蘭地", "4. 威士忌", "1"],
    ["目前市售高級天然釀造醬油強調不添加防腐劑，主要是添加下列何種物質以防止再次發酵及防黴？", "1. 酒精", "2. 食鹽", "3. 檸檬酸", "4. 黑糖", "1"],
    ["蜂蜜最適合用下列哪一種方式去除水分？", "1. 真空乾燥", "2. 流動層乾燥", "3. 熱風乾燥", "4. 油炸乾燥", "1"],
    ["冰淇淋的製程中，將空氣混入混合物，主要是下列哪一步驟？", "1. 均質", "2. 陳化", "3. 凍結", "4. 硬化", "3"],
    ["下列何者不是蛋的加工特性？", "1. 保水性", "2. 起泡性", "3. 乳化性", "4. 熱凝固性", "1"],
    ["下列何者不是亞硫酸鹽的添加目的？", "1. 漂白", "2. 脫臭", "3. 殺菌", "4. 抗氧化","2"],
    ["下列何者可作為化學膨鬆劑，在烘焙時會產生氣體？", "1. 塔塔粉", "2. 小蘇打", "3. 磷酸鹽", "4. 硫酸鹽", "2"],
    ["下列常見傳統豬肉製品與其原料的配對，何者錯誤？", "1. 臘肉─豬腹脇肉", "2. 培根─五花肉", "3. 德國豬腳─豬後腿", "4. 金華火腿─豬後腿", "3"],
    ["製作法蘭克福香腸肉漿時，下列哪種脂肪的溫度控制應該最低，以避免脂肪融解？", "1. 羊脂", "2. 牛油", "3. 豬油", "4. 家禽脂肪", "4"],
    ["下列何者不適合用在葡萄汁酒石之析出去除？", "1. 低溫冷藏", "2. 冷凍", "3. 中溫加熱", "4. 充填二氧化碳", "3"]
]

var question_farming=[
    ["下列何者不是農產運銷的輔助職能？", "1. 分級包裝", "2. 風險負擔", "3. 市場情報", "4. 運銷金融", "1"],
    ["下列何者為稻米生產的主要區域？", "1. 亞洲", "2. 美洲", "3. 澳洲", "4. 非洲", "1"],
    ["下列何者為農藝生產體系之範圍？", "1. 蔬菜", "2. 花卉", "3. 庭園設計", "4. 特用作物", "4"],
    ["有關間作之優點，下列何者不正確？", "1. 防止雜草繁殖", "2. 增加農家收益", "3. 充分利用地力", "4. 改善土壤理化性質", "4"],
    ["下列何者為長日照作物？", "1. 玉米", "2. 馬鈴薯", "3. 水稻", "4. 菸草", "2"],
    ["下列何種作物病害是由細菌引起？", "1. 番茄青枯病", "2. 水稻稻熱病", "3. 木瓜輪點病", "4. 蘋果黑心病","1"],
    ["下列何種乾燥法可保持農產加工品之色、香、味？", "1. 加熱乾燥法", "2. 噴霧乾燥法", "3. 冷凍乾燥法", "4. 自然乾燥法", "3"],
    ["下列何者是木材的主要成分？", "1. 半纖維素", "2. 樹脂", "3. 精油", "4. 單寧", "1"],
    ["森林苗木因土壤之微管引力及低溫作用而倒伏受害者，稱為？", "1. 凍乾", "2. 凍拔", "3. 凍害", "4. 霜裂", "2"],
    ["下列何者是臺灣海拔3000公尺以上最常見的樹種？", "1. 臺灣二葉松", "2. 紅檜", "3. 香杉", "4. 冷杉", "4"]

]


var get_type_of_question ={
    "question_history": question_history,
    "question_science": question_science,
    "question_movie": question_movie,
    "question_food": question_food,
    "question_farming": question_farming
}


export default class App extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            message: "進入下一題",
            question_history: question_history,
            get_list: []
        }
    }


    componentDidMount() {   
   
        fetch('http://lff-production.linxnote.club/api_achievement_list_undertake', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.navigation.state.params.user,
                category: '益智類'
            })
        }).then(res => res.json())
            .then((jsonData) => {              
                this.state.get_list = []
                if (jsonData.message.length == 0) {
                    this.setState({
                        no_data: true
                    })
                    return;
                }
                for (var i = 0; i < jsonData.message.length; i++) {
                    this.state.get_list.push(jsonData.message[i])
                }
                this.setState({
                    get_list: this.state.get_list
                })
            })
            .catch((err) => {
                console.log('錯誤: Puzzle_Undertake ', err);
            })

    }

    render() {
        if (this.state.get_list.length != 0) {
            return (

                <Container>
                    <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Achievement')}
                            ></AntDesign>
                        </Left>
                        <Body style={{ alignItems: 'flex-end' }} ><Text>可參與</Text></Body>
                        <Right />

                    </Header>
                    <Content padder>
                        <Card>
                            {
                                this.state.get_list.map((val, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate('Puzzle_topic'
                                            , { question_topic: get_type_of_question[val.content], user: this.props.navigation.state.params.user, activity_id: val.activity_id })

                                        }>
                                            <CardItem bordered={true} style={{ justifyContent: 'space-between' }}>
                                                <Image style={{width: 50, height: 50}} source={require('../../../IMG/question.png')}/>
                                                <Text>{val.title}</Text>
                                                <Right>
                                                    <Icon name="arrow-forward" />
                                                </Right>
                                            </CardItem>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </Card>
                    </Content>
                </Container>

            );
        }

        if (this.state.no_data == true) {
            return (
                <Container>
                     <Header transparent 
                    >
                        <Left>
                            <AntDesign name="left" style={{ paddingLeft: 10 }} size={25}
                                onPress={() => this.props.navigation.navigate('Undertake', {user: this.props.navigation.state.params.user} )}
                            ></AntDesign>
                        </Left>

                        <Body style={{ alignItems: 'flex-end' }} ><Text>可參與</Text></Body>
                        <Right>
                         
                        </Right>
                    </Header>
                    <View style={styles.container}>
                        <Text>目前未有可參與的成就</Text>
                    </View>
                </Container>
            );

        }

        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="gray" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,      
        justifyContent: 'center',
        alignItems: 'center',
      
    }
})

