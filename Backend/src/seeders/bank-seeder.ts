// seeder.ts or your seeding script
import { AppDataSource } from "../data-source"; 
import { BankDetails } from "../entity/seeder"; 
import { DataSource } from "typeorm";



const userRepository = AppDataSource.getRepository(BankDetails);

const bank = [
    {
        id: 1,
        bank_name: "canarabank",
        branch: "abcd",
        ifsc_code: "abc123",
    },
    {
        id: 2,
        bank_name: "axibank",
        branch: "abcd",
        ifsc_code: "efg123",
    },
];

const seedData = async () => {
    try {
      
        const connection = await AppDataSource.initialize();

        for (const bankDetails of bank) {
          
            const existingBank = await userRepository.findOne({ where: { id: bankDetails.id } });

            if (!existingBank) {
                console.log(`Inserting bank: ${bankDetails.bank_name}`);
                const newBankDetails = userRepository.create(bankDetails);
                await userRepository.save(newBankDetails);
            } else {
                console.log(`Bank with ID ${bankDetails.id} already exists.`);
            }
        }

        await connection.destroy();
        console.log("Data seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

seedData();


