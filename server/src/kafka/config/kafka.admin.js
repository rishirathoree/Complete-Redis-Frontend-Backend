const { kafka } = require("./kafka.config");

const runKafkaAdmin = async () => {
    try {
        const admin = kafka.admin();

        await admin.connect();
        console.log("Connected to Kafka admin");

        await admin.createTopics({
            topics: [
                {
                    topic: "products",
                    numPartitions: 3,
                    replicationFactor: 1,
                },
            ],
        });

        console.log("Created topic");

        await admin.disconnect();
        console.log("Disconnected from Kafka admin");
    } catch (error) {
        console.log('kafka admin error')
        console.log(error)
    }
}

module.exports = {
    runKafkaAdmin,
}