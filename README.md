# Scriptium

**Scriptium** is a project designed to facilitate research and foster discussions among users about religious texts from around the world. It aggregates religious texts from reputable sources recognized by their respective communities. You can find these sources in the **/about** section of the Scriptium website.

Scriptium is primarily intended for theological research and the exchange of ideas about religious texts, but it’s also designed to be accessible for everyday readers. Moreover, Scriptium actively listens to user feedback to improve its features and functionality.

## Scriptium Discord Bot

Scriptium has a Discord bot that allows users to access the content of https://scriptium.net quickly and without opening a browser. For now, this bot allows users to access verses only. In the future, users will be able to do nearly anything they can do on the Scriptium website.

## Features

For now, there is only one command that users execute:

`/read {scriptureCode} {sectionNumber} {chapterNumber} {verseNumber} {translation}? {variation}?`

### Explanation of parameters:

- scriptureCode: The code of the Scripture the user wants to access. For instance, t for Torah.

- sectionNumber: The number of the section according to the Scripture.

- chapterNumber: The number of the chapter according to the section.

- verseNumber: The number of the verse according to the chapter.

- translation? (optional): The desired translation of the verse. If not provided, the default translation will be displayed.

- variation? (optional): The variation of the original text (e.g., with/without nikkud for the Torah). If not available, the default one will be displayed.

---

## Contribute

Thank you for your interest in contributing to **Scriptium**! Your contributions help improve the project and create a better experience for everyone. Please follow the steps below to ensure of a contribution process:

### 🚀 **How to Contribute**

1. **Check for Existing Issues:**  
   Before starting to work on something, check the [Issues](https://github.com/kaanoz1/scriptium-discord-bot/issues) to see if the problem has already been reported or if someone else is working on it.

   - **If the issue exists:** Feel free to join the discussion.
   - **If not:** Open a new issue to describe the problem or feature request.

2. **Fork the Repository:**

   - Click the **"Fork"** button at the top right of the repository page.
   - Clone your forked repository to your local machine:

     ```bash
     git clone https://github.com/kaanoz1/scriptium-discord-bot.git
     ```

3. **Create a Branch:**

   - Always create a new branch for your changes:

     ```bash
     git checkout -b feature-name
     ```

4. **Work on Your Changes:**

   - Make the necessary updates in your branch.
   - If you opened an issue, keep an eye on any feedback or comments.
   - **Write clear and concise commit messages:**

     ```bash
     git add .
     git commit -m "Fix: Issue description here"
     ```

5. **Test Your Changes:**

   - Ensure your changes don’t break existing features.
   - Run the project locally to verify everything works as expected.

6. **Submit a Pull Request (PR):**

   - Push your branch to GitHub:

     ```bash
     git push origin "Feat: Feature Name Here"
     ```

   - Go to the original repository and click **"New Pull Request."**
   - Provide a **detailed description** of the changes you’ve made, including:
     - The problem you’re solving
     - How you fixed it
     - Any additional notes for reviewers

7. **Review and Feedback:**
   - A review process will follow. Address any requested changes promptly.
   - Discussions are always welcome to ensure code quality and project alignment.

---

### **Thank You!**

Every contribution no matters—big or small. Our team, Even though I’m currently the sole maintainer of this project, is thankful for you!. Your support is invaluable. Thank you for being a part of **Scriptium** and helping it grow!

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** License.

For more details, see the [LICENSE](LICENSE) file or visit [Creative Commons License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
